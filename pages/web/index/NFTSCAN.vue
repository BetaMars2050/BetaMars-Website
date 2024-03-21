<template>
  <div class="nfts">
    <div class="search-header">
      <Dropdown
        @toggleCurrentDropdownItem="toggleCurrentDropdownItem"
      ></Dropdown>

      <input
        type="text"
        class="search-input"
        v-model.trim="currentId"
        maxlength="150"
        :placeholder="'SEARCH  ' + currentDropdownItem.name"
      />
      <div class="search-icon" @click="searchNft">
        <img src="../../../static/image/nfts-search.png" class="icon" alt="" />
      </div>
    </div>
    <div class="search-container" v-if="searchResult.length || isLoading">
      <template v-if="!isLoading">
        <div class="item" v-for="item in searchResult" :key="item.tokenID">
          <div class="item-left">
            <el-image :src="item.imgUrl" class="nft-img">
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
import { mapGetters } from "vuex";
import { NFTIDREG } from "@/common/regExp.js";
import { readUrlByIpfs } from "@/common/ipfs.js";
import { throttle } from "lodash";
import { Provider } from "@/common/provider.js";
import { Contract } from "@/common/contract";
import ImageLoading from "../../../components/ImageLoading.vue";
import {
  getUserNftListByContractAdd,
  checkTicketStatus,
} from "@/api/tickets.js";
export default {
  components: { ImageLoading },
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
      console.log(this.web3);
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
      if (
        contractAddress === Contract.NftContractAdd ||
        contractAddress === Contract.oldNftContractAdd
      ) {
        this.NftContract = new this.web3.eth.Contract(
          Contract.NftContractABI,
          contractAddress
        );

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
  width: 100%;
  height: 1080px;
  background: url("../../../static/image/nfts-bg.png");
  background-size: 100% 100%;
  .search-header {
    position: absolute;
    top: 210px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 886px;
    height: 57px;
    background-color: #0f0f10;
    z-index: 2;
    .search-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 206px;
      height: 100%;
      border: 1px solid rgba($color: #f76e23, $alpha: 0.5);
      padding: 24px;
      border-right: none;

      font-size: 14px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #3d3d3f;

      .filter-icon {
        width: 15px;
        height: 8px;
      }
    }

    .search-input {
      flex: 1;
      height: 100%;
      background-color: #0f0f10;
      border: none;
      border: 1px solid rgba($color: #f76e23, $alpha: 0.5);
      box-sizing: border-box;
      outline: none;

      font-size: 14px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #3d3d3f;
      padding: 24px;
    }
    .search-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 63px;
      height: 100%;
      background-color: #412314;
      border: 1px solid rgba($color: #f76e23, $alpha: 0.5);
      border-left: none;
      cursor: pointer;
      .icon {
        width: 25px;
        height: 26px;
      }
    }
  }

  .search-container {
    position: absolute;
    top: 335px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 983px;
    height: 700px;
    padding: 0 30px 50px 33px;
    background-color: rgba($color: #e39e4b, $alpha: 0.05);
    overflow-y: auto;
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
      width: 100%;
      min-height: 485px;
      border-bottom: 1px solid #362217;
      margin-top: 50px;
      z-index: 1;
      .item-left {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 271px;
        height: 395px;
        background: url("../../../static/image/nfts-img-bg.png");
        background-size: 100% 100%;
        /deep/ .nft-img {
          width: 233px;
          height: 358px;
          .image-slot-placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 233px;
            height: 358px;
            font-size: 14px;
            font-family: "BankGothic";
            font-weight: 400;
            color: #ffffff;
          }
          .image-slot-error {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 14px;
            font-family: "BankGothic";
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
      .item-right {
        flex: 1;
        height: 100%;
        margin-left: 20px;
        .item-content {
          padding-top: 20px;
          padding-left: 20px;
          .item-title {
            font-size: 24px;
            font-family: "BankGothic";
            font-weight: 400;
            color: #ffffff;
            margin-bottom: 20px;
          }

          .item-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            .item-row-title {
              width: 150px;
              min-width: 150px;
              font-size: 14px;
              font-family: "BankGothic";
              font-weight: 400;
              color: #ffffff;
            }
            a:hover {
              text-decoration: underline;
            }
            .item-row-text {
              padding-right: 20px;
              flex: 1;
              word-break: break-all;
              font-size: 12px;
              font-family: "BankGothic";
              font-weight: 400;
              color: #ffffff;
              opacity: 0.7;
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
          width: 211px;
          height: 85px;
          background: url("../../../static/image/nfts-download-btn-bg.png");
          background-size: 100% 100%;
          margin-top: 30px;
          font-size: 18px;
          font-family: "BankGothic";
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
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