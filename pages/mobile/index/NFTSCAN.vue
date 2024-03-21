<template>
  <div class="nfts">
    <div class="search-header">
      <Dropdown-m
        @toggleCurrentDropdownItem="toggleCurrentDropdownItem"
      ></Dropdown-m>
      <input
        type="text"
        class="search-input"
        v-model.trim="currentId"
        maxlength="150"
        :placeholder="'search  ' + currentDropdownItem.name"
      />
      <div class="search-icon" @click="searchNft">
        <img
          src="../../../static/image/nfts-search-m.png"
          class="icon"
          alt=""
        />
      </div>
    </div>
    <div class="search-container" v-if="searchResult.length || isLoading">
      <template v-if="!isLoading">
        <div class="item" v-for="item in searchResult" :key="item.tokenID">
          <div class="item-left">
            <el-image :src="item.imgUrl" crossorigin class="nft-img">
              <div slot="placeholder" class="image-slot-placeholder">
                <ImageLoading></ImageLoading>
              </div>

              <div slot="error" class="image-slot-error">Loading failed</div>
            </el-image>
          </div>
          <div class="item-right">
            <div class="item-content">
              <div class="item-title">Ticket NFT</div>
              <div class="item-row">
                <div class="item-row-title">OWNER:</div>
                <div class="item-row-text">
                  {{ item.to }}
                </div>
              </div>
              <div class="item-row">
                <div class="item-row-title">BSC NFT ID:</div>
                <div class="item-row-text">
                  {{ item.tokenID }}
                </div>
              </div>
              <div class="item-row">
                <div class="item-row-title">TICKET TYPE:</div>
                <div class="item-row-text">
                  {{ item.nftType }}
                </div>
              </div>
              <div class="item-row">
                <div class="item-row-title">CONTRACT:</div>
                <div class="item-row-text">
                  0x90FC8d0Ecd1A0837dAc6DDF2eF45B5f1dB79383b
                </div>
              </div>
              <div class="item-row">
                <div class="item-row-title">IMAGE URL:</div>
                <a class="item-row-text" :href="item.imgUrl" target="_blank">
                  {{ item.imgUrl }}
                </a>
              </div>
            </div>
            <div class="item-download-btn" @click="download(item)">
              Download
            </div>
          </div>
        </div>
      </template>
      <div class="loading-box" v-else>
        <ImageLoading></ImageLoading>
        <div class="loading-text">loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
import { NFTIDREG } from "@/common/regExp.js";
import { readUrlByIpfs } from "@/common/ipfs.js";
import { throttle } from "lodash";
import { Provider } from "@/common/provider.js";
import { Contract } from "@/common/contract";
import { mapGetters } from "vuex";

import {
  getUserNftListByContractAdd,
  checkTicketStatus,
} from "@/api/tickets.js";
export default {
  name: "BetamarsNfts",

  data() {
    return {
      currentDropdownItem: { id: 0, name: "Address" },
      currentId: "",
      ERC721Contract: null,
      NftContract: null,
      tokenID: "",
      isLoading: false,
      searchResult: [],
      shopNftContract: null,
      parmeters: {
        module: "account",
        action: "tokennfttx",
        contractaddress: Contract.ERC721ContractAdd,
        address: "",
        page: 1,
        offset: 100,
        startblock: 0,
        sort: "asc",
        endblock: 999999999,
        apikey: "UNR4XJX9SRPA14H6W42A2TIWUYZH4SVDWC",
      },
    };
  },
  created() {},
  mounted() {
    this.connectWeb3();
  },
  computed: {
    ...mapGetters(["web3"]),
  },
  methods: {
    connectWeb3() {
      const {
        ERC721ContractABI,
        ERC721ContractAdd,
        NftContractABI,
        NftContractAdd,
        ticketShopContractABI,
        ticketShopContractAdd,
      } = Contract;
      this.ERC721Contract = new this.web3.eth.Contract(
        ERC721ContractABI,
        ERC721ContractAdd
      );
      this.NftContract = new this.web3.eth.Contract(
        NftContractABI,
        NftContractAdd
      );
      this.shopNftContract = new this.web3.eth.Contract(
        ticketShopContractABI,
        ticketShopContractAdd
      );
    },
    toggleCurrentDropdownItem(e) {
      this.currentDropdownItem = e;
    },
    async queryNftOwner(tokenID) {
      const res = await this.ERC721Contract.methods.ownerOf(tokenID).call();
      return res;
    },
    async queryNftImgUrl(tokenID) {
      const res = await this.ERC721Contract.methods.tokenURI(tokenID).call();

      let imgUrl;
      try {
        imgUrl = await readUrlByIpfs(res);
      } catch (err) {
        imgUrl = { image: "" };
      }
      return imgUrl.image;
    },
    async queryNftType(tokenID) {
      const res = await this.NftContract.methods.nftid(tokenID).call();
      let nftType =
        res === "1" ? "Common " : res === "2" ? "Rare " : "Co-brand";
      return nftType;
    },
    download(item) {
      const a = document.createElement("a");
      const url = item.imgUrl;
      if (!item.imgUrl) {
        return this.downloadFail();
      }
      this.$message({
        showClose: true,
        message: "Downloading...",
        type: "warning",
        duration: "3000",
      });
      try {
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            console.log(blob);
            a.href = URL.createObjectURL(blob);
            a.download = "BETAMARSTICKETS-" + item.tokenID + ".png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
      } catch (err) {
        this.downloadFail();
        console.log(err, "fetch error");
      }
    },
    downloadFail() {
      this.$message({
        showClose: true,
        message: "Download failed！",
        type: "warning",
        duration: "3000",
      });
    },
    async checkNftId(id) {
      const res = await checkTicketStatus(id);
      return res.data;
    },
    searchNft: throttle(async function () {
      if (!this.validate()) {
        return false;
      }
      this.isLoading = true;
      this.searchResult = [];
      if (this.currentDropdownItem.id === 1) {
        const result = await this.checkNftId({ nftId: this.currentId });

        if (result.validity) {
          this.searchNftById(result.address);
        } else {
          this.isLoading = false;
          this.$message.warning("Invalid Ticket NFT");
        }
      } else {
        this.searchAddress();
      }
    }, 1500),
    searchNftById(contractAddress) {
      this.tokenID = this.currentId;
      if (contractAddress === Contract.NftContractAdd) {
        Promise.all([
          this.queryNftOwner(this.tokenID),
          this.queryNftImgUrl(this.tokenID),
          this.queryNftType(this.tokenID),
        ])
          .then((res) => {
            this.isLoading = false;
            this.searchResult = [
              {
                to: res[0],
                imgUrl: res[1],
                nftType: res[2],
                tokenID: this.tokenID,
              },
            ];
          })
          .catch((err) => {
            this.isLoading = false;
            this.errorHandle(err);
          });
      } else {
        this.shopContractQuery();
      }
    },
    shopContractQuery() {
      this.shopNftContract.methods
        .UserNftInit(this.tokenID)
        .call()
        .then(async (res) => {
          console.log(res);
          let owner = await this.queryNftOwner(this.tokenID);
          this.isLoading = false;

          this.searchResult = [
            {
              to: owner,
              imgUrl: res.img,
              nftType:
                res.rare === "1"
                  ? "Common "
                  : res === "2"
                  ? "Rare "
                  : "Co-brand",
              tokenID: this.tokenID,
            },
          ];
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorHandle(err);
        });
    },
    async loopGetData(arr) {
      let box = [];
      for (let i = 0; i < arr.length; i++) {
        let v = arr[i];
        try {
          let result = await this.checkNftId({ nftId: v.tokenID });
          if (result.validity) {
            if (result.address === Contract.NftContractAdd) {
              let info = await Promise.all([
                this.queryNftImgUrl(v.tokenID),
                this.queryNftType(v.tokenID),
              ]);
              v.imgUrl = info[0];
              v.nftType = info[1];
              box.push(v);
            } else {
              let info = await this.shopNftContract.methods
                .UserNftInit(v.tokenID)
                .call();

              v.imgUrl = info.img;
              v.nftType =
                info.rare === "1"
                  ? "Common "
                  : res === "2"
                  ? "Rare "
                  : "Co-brand";
              box.push(v);
            }
          } else {
            this.$message.warning("Invalid Ticket NFT");
          }
        } catch (err) {
          this.errorHandle(err);
        }
      }

      this.searchResult = box;
      this.isLoading = false;
    },
    searchAddress() {
      this.parmeters.address = this.currentId;
      getUserNftListByContractAdd(this.parmeters)
        .then((res) => {
          this.searchResult = res.result;
          this.loopGetData(res.result);
        })
        .catch((err) => {
          if (err.result.length) {
            this.$message.warning(err.result);
          } else {
            this.$message.warning(err.message);
          }

          this.isLoading = false;
        });
    },
    errorHandle(err) {
      console.log(err);
      var error = err.toString();
      if (error.indexOf("URI query for nonexistent token") !== -1) {
        this.$message.warning(" No relevant information found!");
      } else {
        this.$message.warning("Fail to inquire. Please try again later!");
      }
    },
    validate() {
      if (
        this.currentDropdownItem.id === 1 &&
        (!NFTIDREG.test(this.currentId) || !this.currentId)
      ) {
        this.$message.warning(" Please  enter correct NFT ID!");
        return false;
      }

      if (this.currentDropdownItem.id === 0 && !this.currentId) {
        this.$message.warning(" Please  enter correct Address!");
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.nfts {
  position: relative;
  width: 750px;
  min-height: 1434px;
  background: url("../../../static/image/nfts-bg-m.png");
  background-size: 100% 100%;
  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 110px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 686px;
    height: 70px;
    border: 1px solid #f76e23;
    z-index: 2;
    background: rgba(20, 14, 19, 0.95);
    .search-input {
      flex: 1;
      height: 100%;
      background: rgba(20, 14, 19, 0.95);
      outline: none;
      border: none;
      box-sizing: border-box;
      padding: 20px;
      font-size: 24px;

      font-family: "BankGothic";
      font-weight: 400;
      color: #585552;
      letter-spacing: 3px;
    }
    .search-icon {
      width: 70px;
      height: 70px;
      background: #f76e23;
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
      .icon {
        width: 34px;
        height: 34px;
      }
    }
  }
  .search-container {
    position: absolute;
    top: 240px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 710px;
    height: 915px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 6px;
    .loading-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300px;
      .loading-text {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #ffffff;
        padding-left: 10px;
      }
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 680px;
      min-height: 515px;
      background: rgba(27, 23, 21, 0.7);
      box-shadow: 0px 0px 10px 0px rgba(247, 110, 35, 0.4);
      margin-bottom: 30px;
      padding: 20px;
      z-index: 1;
      .item-left {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 310px;
        height: 476px;
        /deep/ .nft-img {
          width: 100%;
          height: 100%;
          .image-slot-placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 310px;
            height: 476px;
            font-size: 20px;
            font-family: "BankGothic";
            font-weight: 400;
            color: #ffffff;
          }
          .image-slot-error {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 310px;
            height: 476px;
            font-size: 20px;
            font-family: "BankGothic";
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
      .item-right {
        flex: 1;
        height: 100%;
        margin-left: 10px;
        .item-content {
          padding-left: 10px;
          .item-title {
            font-size: 20px;
            font-family: "BankGothic";
            font-weight: 400;
            color: #ffffff;
            letter-spacing: 3px;
            margin-bottom: 20px;
          }

          .item-row {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 10px;
            .item-row-title {
              width: 316px;
              min-width: 316px;
              font-size: 14px;
              font-family: "BankGothic";
              font-weight: 400;
              color: #ffffff;
              letter-spacing: 2px;
            }
            a:hover {
              text-decoration: underline;
            }
            .item-row-text {
              padding-right: 20px;
              flex: 1;
              word-break: break-all;
              font-size: 14px;
              font-family: "BankGothic";
              font-weight: 400;
              color: #413c3a;
              letter-spacing: 2px;
            }
          }
          .item-row:last-child {
            margin-bottom: 0px !important;
          }
        }

        .item-download-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 76px;
          background: url("../../../static/image/airdrop-btn-m.png");
          background-size: 100% 100%;
          margin-top: 30px;
          font-size: 24px;
          font-family: "BankGothic";
          font-weight: 400;
          color: #f76e23;
          letter-spacing: 2px;
          cursor: pointer;
        }
      }
    }
  }
}

input::placeholder {
  /* most browsers */
  font-size: 24px;
  font-family: "BankGothic";
  font-weight: 400;
  color: #585552;
  letter-spacing: 3px;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 24px;

  font-family: "BankGothic";
  font-weight: 400;
  color: #585552;
  letter-spacing: 3px;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 24px;

  font-family: "BankGothic";
  font-weight: 400;
  color: #585552;
  letter-spacing: 3px;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 24px;

  font-family: "BankGothic";
  font-weight: 400;
  color: #585552;
  letter-spacing: 3px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: 24px;

  font-family: "BankGothic";
  font-weight: 400;
  color: #585552;
  letter-spacing: 3px;
}
</style>
<style>
.search-container::-webkit-scrollbar {
  width: 4px;
}
.search-container::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}
.search-container::-webkit-scrollbar-thumb {
  background-color: #f76e23;
  border-radius: 20px;
}
</style>