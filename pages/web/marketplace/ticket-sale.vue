<template>
  <div class="page">
    <div class="top"></div>

    <div class="container">
      <div class="ticket">
        <div class="ticket-box">
          <div class="ticket-left">
            <div class="ticket-left-swiper">
              <TicketSaleSwiper />
            </div>
          </div>
          <div class="ticket-right">
            <div class="ticket-top">
              <div class="ticket-title">Ticket NFT</div>
            </div>

            <div class="ticket-content">
              <div class="ticket-info">
                <div class="ticket-item">
                  <div class="ticket-item-title">Contract address:</div>
                  <a
                    href="https://bscscan.com/token/0x90fc8d0ecd1a0837dac6ddf2ef45b5f1db79383b"
                    target="_blank"
                    class="ticket-item-text ticket-address"
                  >
                    0x90F****383b
                  </a>
                </div>
                <div class="ticket-item">
                  <div class="ticket-item-title">Asset public chain:</div>
                  <div class="ticket-item-text">BSC</div>
                </div>
                <div class="ticket-item">
                  <div class="ticket-item-title">Asset Protocol:</div>
                  <div class="ticket-item-text">ERC721</div>
                </div>
              </div>
              <div class="ticket-row">
                <div class="ticket-row-title">Username:</div>
                <input
                  type="text"
                  v-model.trim="username"
                  placeholder="4-8 Characters"
                />
              </div>
            </div>

            <div class="ticket-footer">
              <div class="price">
                <div class="price-title">Offering Price:</div>
                <div class="price-num" v-if="tokenList.length">
                  {{ isWhiteList ? 60 : tokenList[current].realMoney }}
                  {{ tokenList[current].tokenName }}
                </div>
              </div>
              <div class="mint" @click="mint">BID</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-title">About Ticket NFT</div>
        <div class="footer-text">
          1.Ticket NFT is the key to enter BetaMars world.
        </div>

        <div class="footer-text">
          2.Players can activate Miners’ jurisdiction by using one Ticket NFT
          and gain permanent access to the world of BetaMars.
        </div>

        <div class="footer-text">
          3.Blue Ticket and Golden Ticket respectively correspond to the common
          and rare Ticket NFT. Rare Ticket NFT has an only 3% drop rate when
          minting.
        </div>
      </div>
    </div>
    <Loading :isLoadingShow="isLoadingShow" />
    <GetAirDropModal
      :imgUrl="imgUrl"
      :id="id"
      :nftId="nftId"
      @hideGetAirdropModal="hideGetAirdropModal"
      :isShow="isGetAirdropModalShow"
    />
  </div>
</template>

<script>
import moment from "moment";

import { mapGetters } from "vuex";
import { Contract } from "@/common/contract/index.js";
import { USERNAMEREG } from "@/common/regExp.js";
import { gitTicketSaleTokenInfo } from "@/api/tickets.js";
import ticket from "../../mobile/index/ticket.vue";
import { setSessionItem } from "@/storage/index.js";
import { inviteCode } from "@/storage/keys.js";
export default {
  components: { ticket },
  name: "BetamarsTicketSale",
  data() {
    return {
      address: "",
      username: "",
      ticketERC721Contract: null,
      ticketERC20Contract: null,
      ticketShopContract: null,
      ticketWhiteSale: null,
      isLoadingShow: false,
      isGetAirdropModalShow: false,
      nftId: 0,
      id: 0,
      imgUrl: "",
      activityId: 7,
      current: 0,
      tokenList: [],
      isWhiteList: false,
    };
  },
  computed: {
    ...mapGetters(["web3", "account"]),
  },
  created() {
    gitTicketSaleTokenInfo({ activityId: this.activityId })
      .then((res) => {
        console.log(res);
        this.tokenList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    if (this.$route.query?.code) {
      this.$store.commit("setInviteCode", this.$route.query.code);
      setSessionItem(inviteCode, this.$route.query.code);
    }
  },
  watch: {
    account: {
      handler(val) {
        if (val) {
          this.checkIsWhiteList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    checkIsWhiteList() {
      const { ticketWhiteSaleContractABI, ticketWhiteSaleContractAdd } =
        Contract;

      this.ticketWhiteSale = new this.web3.eth.Contract(
        ticketWhiteSaleContractABI,
        ticketWhiteSaleContractAdd
      );
      this.ticketWhiteSale.methods
        .whiteList(this.account)
        .call()
        .then((res) => {
          console.log(res);
          this.isWhiteList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hideGetAirdropModal() {
      this.isGetAirdropModalShow = false;
    },
    async mint() {
      this.contractInit();

      if (!this.validate()) return false;
      this.isLoadingShow = true;
      this.ticketERC20Contract = new this.web3.eth.Contract(
        Contract.ticketERC20ContractABI,
        this.tokenList[this.current].tokenAddress
      );
      console.log(this.account);

      let isAuth = await this.ticketERC20Contract.methods
        .allowance(
          this.account,
          this.isWhiteList
            ? Contract.ticketWhiteSaleContractAdd
            : Contract.ticketShopContractAdd
        )
        .call();
      if (isAuth === "0") {
        this.ticketERC20Contract.methods
          .approve(
            this.isWhiteList
              ? Contract.ticketWhiteSaleContractAdd
              : Contract.ticketShopContractAdd,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .send({ from: this.account })
          .then((res) => {
            if (this.isWhiteList) {
              this.whitelistBuyTikcet();
            } else {
              this.payment();
            }

            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            this.$message.warning(err.message);
            this.isLoadingShow = false;
          });
      } else {
        if (this.isWhiteList) {
          this.whitelistBuyTikcet();
        } else {
          this.payment();
        }
      }
    },
    contractInit() {
      const {
        ticketERC20ContractAdd,
        ticketERC721ContractAdd,
        ticketShopContractAdd,
        ticketERC20ContractABI,
        ticketERC721ContractABI,
        ticketShopContractABI,
        ticketWhiteSaleContractABI,
        ticketWhiteSaleContractAdd,
      } = Contract;
      this.ticketERC721Contract = new this.web3.eth.Contract(
        ticketERC721ContractABI,
        ticketERC721ContractAdd
      );
      this.ticketWhiteSale = new this.web3.eth.Contract(
        ticketWhiteSaleContractABI,
        ticketWhiteSaleContractAdd
      );
      this.ticketShopContract = new this.web3.eth.Contract(
        ticketShopContractABI,
        ticketShopContractAdd
      );
      console.log(this.ticketShopContract, "console");
    },
    whitelistBuyTikcet() {
      this.ticketWhiteSale.methods
        .whiteBuy(this.web3.utils.toWei("60"), this.username)
        .send({ from: this.account })
        .then((res) => {
          console.log(res);
          let interval = setInterval(() => {
            this.ticketWhiteSale.getPastEvents(
              "_userMint",
              {
                filter: {
                  _to: this.account,
                },
                fromBlock: res.blockNumber,
              },
              (err, res) => {
                console.log(res, err, "event");
                if (res.length) {
                  clearInterval(interval);
                  this.nftId = Number(res[0].returnValues._nftid);
                  this.id = Number(res[0].returnValues._rare);
                  this.imgUrl = res[0].returnValues._IMG;
                  this.isLoadingShow = false;
                  this.isGetAirdropModalShow = true;
                }
              }
            );
          }, 5000);
        })
        .catch((err) => {
          this.$message.warning(err.message);
          this.isLoadingShow = false;
          console.log(err);
        });
    },
    payment() {
      this.ticketShopContract.methods
        .userShop(
          Contract.ticketERC20ContractAdd,
          this.tokenList[this.current].money.toString(),
          this.tokenList[this.current].tokenName,
          this.username
        )
        .send({ from: this.account })
        .then((res) => {
          console.log(res);

          let interval = setInterval(() => {
            this.ticketShopContract.getPastEvents(
              "_mintNFT",
              {
                filter: {
                  _user: this.account,
                },
                fromBlock: res.blockNumber,
              },
              (err, res) => {
                if (res.length) {
                  clearInterval(interval);
                  console.log(res, "event");
                  this.nftId = Number(res[0].returnValues._nftid);
                  this.id = Number(res[0].returnValues._rare);
                  this.imgUrl = res[0].returnValues._img;
                  this.isLoadingShow = false;
                  this.isGetAirdropModalShow = true;
                }
              }
            );
          }, 5000);
        })
        .catch((err) => {
          this.$message.warning(err.message);
          this.isLoadingShow = false;
          console.log(err, "123");
        });

      // this.ticketShopContract.once(
      //   "_mintNFT",
      //   {
      //     filter: {
      //       _user: this.account,
      //     },
      //     fromBlock: 0,
      //   },
      //   (err, res) => {
      //     console.log(res, err, "event");
      //     this.nftId = Number(res.returnValues._nftid);
      //     this.id = Number(res.returnValues._rare);
      //     this.imgUrl = res.returnValues._img;
      //     this.isLoadingShow = false;
      //     this.isGetAirdropModalShow = true;
      //   }
      // );
    },
    validate() {
      const { username, account } = this;
      if (!this.tokenList.length) {
        this.$message.warning("Prices are being obtained...");
        return false;
      }

      if (!account) {
        this.$message.warning("Please connect your wallet first!");
        return false;
      }

      if (!USERNAMEREG.test(username)) {
        this.$message.warning(
          "Username should between 4-8 characters in upper case letters!"
        );
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;

  .top {
    width: 100%;
    height: 300px;
    background: url("../../../static/image/ticket-sale-top.png");
    background-size: 100% 100%;
    margin-top: 100px;
  }

  .container {
    width: 100%;
    background: #000;
    padding-top: 50px;
  }
  .ticket {
    width: 1400px;
    // padding: 30px 44px;
    margin: 0 auto;
    padding-left: 30px;
    .ticket-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      /deep/.ticket-left {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 357px;
        height: 519px;

        background-size: 100% 100%;
        .ticket-left-swiper {
          width: 320px;
          height: 504px;
          .swiper-slide {
            width: 320px !important;
            height: 504px !important;
            .img1 {
              width: 320px !important;
              height: 504px !important;
            }
          }
        }
      }
      .ticket-right {
        flex: 1;
        margin-left: 60px;
        .ticket-top {
          display: flex;
          align-items: center;
          margin-bottom: 44px;
        }
        .ticket-title {
          font-size: 30px;
          font-family: Ubuntu-Bold, Ubuntu;
          font-weight: bold;
          color: #ffffff;
        }
        .icon-warning {
          width: 30px;
          height: 30px;
          background: url("../../../static/image/ticket-warning.png");
          background-size: 100% 100%;
          margin-left: 20px;
          border-radius: 50%;
        }

        .ticket-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .ticket-row {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .ticket-row-title {
              font-size: 16px;
              font-family: Ubuntu-Regular, Ubuntu;
              font-weight: 400;
              color: #ffffff;
              opacity: 0.5;
              margin-bottom: 10px;
            }
            input {
              width: 400px;
              height: 50px;
              background: #000;
              border: 1px solid rgba(#ff9000, 0.2);
              font-size: 16px;
              font-family: Ubuntu-Regular, Ubuntu;
              font-weight: 600;
              color: #ffffff;
              line-height: 40px;
              text-align: left;
              padding: 10px;
              outline: none;
              box-sizing: border-box;
            }
          }
          .ticket-info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
          }

          .ticket-item {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .ticket-address:hover {
              cursor: pointer;
              border-bottom: 1px solid #fff !important;
            }
            .ticket-address {
              border-bottom: 1px solid transparent;
            }
            .ticket-item-title {
              font-size: 16px;
              font-family: Ubuntu-Regular, Ubuntu;
              font-weight: 400;
              opacity: 0.5;
              color: #ffffff;
            }
            .ticket-item-text {
              font-size: 16px;
              font-family: Ubuntu-Regular, Ubuntu;
              font-weight: 600;
              color: #ffffff;
              margin-top: 12px;
            }
          }
        }

        .ticket-footer {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 44px;
          .price {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: space-between;
            .price-title {
              font-size: 16px;
              font-family: Ubuntu-Regular, Ubuntu;
              font-weight: 400;
              color: #ffffff;
              opacity: 0.5;
              margin-bottom: 12px;
            }
            .price-num {
              font-size: 20px;
              font-family: Ubuntu-Regular, Ubuntu;

              font-weight: 600;
              color: #ff9000;
            }
          }
          .mint {
            width: 160px;
            height: 40px;
            background: #ff9000;
            font-size: 20px;
            font-family: Ubuntu-Bold, Ubuntu;
            font-weight: bold;
            color: #ffffff;
            line-height: 40px;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            margin-top: 100px;
          }
        }
      }
    }
  }
  .footer {
    width: 1400px;
    margin: 0 auto;
    margin-top: 40px;
    padding-bottom: 50px;
    .footer-title {
      font-size: 26px;
      font-family: Ubuntu-Bold, Ubuntu;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 20px;
    }
    .footer-text {
      font-size: 16px;
      font-family: Ubuntu-Regular, Ubuntu;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 4px;
    }
  }
}
</style>
<style  scoped>
input::placeholder {
  font-size: 16px;

  font-family: Ubuntu-Regular, Ubuntu;
  font-weight: 600;
  color: #ffffff;
}

::-webkit-input-placeholder {
  font-size: 16px;

  font-family: Ubuntu-Regular, Ubuntu;
  font-weight: 600;
  color: #ffffff;
}

:-moz-placeholder {
  font-size: 16px;

  font-family: Ubuntu-Regular, Ubuntu;
  font-weight: 600;
  color: #ffffff;
}

::-moz-placeholder {
  font-size: 16px;

  font-family: Ubuntu-Regular, Ubuntu;
  font-weight: 600;
  color: #ffffff;
}

:-ms-input-placeholder {
  font-size: 16px;

  font-family: Ubuntu-Regular, Ubuntu;
  font-weight: 600;
  color: #ffffff;
}
</style>