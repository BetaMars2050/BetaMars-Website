<template>
  <div class="page">
    <div class="page-title">click to enter stellar journey</div>
    <div class="page-desc">mint ticket nft open the door to betamars</div>
    <!-- <div class="countdown" v-if="!activity">
      <FlipCountdown-m
        :endDate="utcTime"
        :timeUnit="[':', ':', ':']"
        :type="3"
        :theme="2"
        @timeUp="timeEnd"
      />
      <div
        class="countdown-footer"
        :class="timeStatus ? 'countdown-footer2' : ''"
      >
        <div>Hrs</div>
        <div>Mins</div>
        <div>Secs</div>
      </div>
    </div> -->
    <div class="ticket">
      <div class="ticket-item">
        <div class="ticket-left">
          <div class="ticket-left-swiper">
            <AirDropSwiper-m />
          </div>
        </div>
        <div class="ticket-right">
          <div class="ticket-top">
            <div class="ticket-title">Ticket NFT</div>
            <a
              class="icon-warning"
              target="_blank"
              href="https://medium.com/@betamars2050/what-is-a-betamars-ticket-nft-find-answer-here-db3bc9bb1944"
            ></a>
          </div>

          <div class="ticket-content">
            <div class="ticket-row">
              <div class="ticket-row-title">username:</div>
              <input
                type="text"
                v-model.trim="username"
                placeholder="4-8   Characters"
              />
            </div>
            <div class="ticket-row">
              <div class="ticket-row-title">Contract address:</div>
              <a
                href="https://bscscan.com/token/0x90fc8d0ecd1a0837dac6ddf2ef45b5f1db79383b"
                target="_blank"
                class="ticket-row-text ticket-address"
              >
                0x90F****dB79383b
              </a>
            </div>
            <div class="ticket-row">
              <div class="ticket-row-title">Asset public chain:</div>
              <div class="ticket-row-text">BSC</div>
            </div>
            <div class="ticket-row">
              <div class="ticket-row-title">Asset Protocol:</div>
              <div class="ticket-row-text">ERC721</div>
            </div>
          </div>

          <div class="ticket-footer">
            <div class="price">
              <div class="price-title">Offering Price:</div>
              <div class="price-num" v-if="tokenList.length">
                {{ tokenList[current].realMoney }}
                {{ tokenList[current].tokenName }}
              </div>
            </div>
            <div class="mint" @click="mint">mint</div>
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
        2.Players can activate Miners’ jurisdiction by using one Ticket NFT and
        gain permanent access to the world of BetaMars.
      </div>

      <div class="footer-text">
        3.Blue Ticket and Golden Ticket respectively correspond to the common
        and rare Ticket NFT. Rare Ticket NFT has an only 3% drop rate when
        minting.
      </div>
    </div>
    <Loading :isLoadingShow="isLoadingShow" />
    <GetAirDropModal-m
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
export default {
  name: "BetamarsTicket",
  data() {
    return {
      address: "",
      username: "",
      ticketERC721Contract: null,
      ticketERC20Contract: null,
      ticketShopContract: null,
      isLoadingShow: false,
      isGetAirdropModalShow: false,
      nftId: 0,
      id: 0,
      imgUrl: "",
      activityId: 7,
      current: 0,
      tokenList: [],
      // utcTime: "",
      // timeStatus: false,
      // activity: false,
    };
  },
  computed: {
    ...mapGetters(["web3", "account"]),
  },
  created() {
    // this.utcTime = moment.utc("2022-02-04 00:00").valueOf();
    // let time = this.countdown(this.utcTime);
    // if (time < 100) {
    //   this.timeStatus = true;
    // } else if (time <= 0) {
    //   this.activity = true;
    // }
    gitTicketSaleTokenInfo({ activityId: this.activityId })
      .then((res) => {
        console.log(res);
        this.tokenList = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {
    timeEnd() {
      this.activity = true;
    },
    // countdown(end) {
    //   const now = moment().valueOf();
    //   console.log(end, now, end - now);
    //   if (now >= end) {
    //     this.day = "00";
    //     this.hr = "00";
    //     this.min = "00";
    //     this.sec = "00";
    //     return;
    //   }
    //   const msec = end - now;
    //   let hr = parseInt(msec / 1000 / 60 / 60);
    //   return hr;
    // },
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
        .allowance(this.account, Contract.ticketShopContractAdd)
        .call();
      if (isAuth === "0") {
        this.ticketERC20Contract.methods
          .approve(
            Contract.ticketShopContractAdd,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .send({ from: this.account })
          .then((res) => {
            this.payment();
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            this.$message.warning(err.message);
            this.isLoadingShow = false;
          });
      } else {
        this.payment();
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
      } = Contract;
      this.ticketERC721Contract = new this.web3.eth.Contract(
        ticketERC721ContractABI,
        ticketERC721ContractAdd
      );
      this.ticketShopContract = new this.web3.eth.Contract(
        ticketShopContractABI,
        ticketShopContractAdd
      );
      console.log(this.ticketShopContract);
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
        })
        .catch((err) => {
          this.$message.warning(err.message);
          this.isLoadingShow = false;
          console.log(err);
        });
      this.ticketShopContract.once(
        "_mintNFT",
        {
          filter: {
            _user: this.account,
          },
          fromBlock: 0,
        },
        (err, res) => {
          console.log(res, err, "event");
          this.nftId = Number(res.returnValues._nftid);
          this.id = Number(res.returnValues._rare);
          this.imgUrl = res.returnValues._img;
          this.isLoadingShow = false;
          this.isGetAirdropModalShow = true;
        }
      );
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
  position: relative;
  width: 100%;
  height: auto;
  background: url("../../../static/image/ticket-nft-market-bg-m.png");
  background-size: 100% 100%;
  padding-bottom: 270px;
  padding-top: 150px;

  .page-title {
    width: 100%;
    font-size: 30px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    letter-spacing: 4px;
  }
  .page-desc {
    width: 100%;
    font-size: 18px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #f76e23;
    letter-spacing: 4px;
    text-align: center;
    margin-top: 25px;
  }
  .countdown {
    width: 750px;
    height: 600px;
    margin-top: 25px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .countdown-footer {
      width: 100%;
      margin-top: 14px;
      font-size: 22px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      position: relative;
      div {
        position: absolute;
      }
      div:nth-child(1) {
        left: 158px;
      }
      div:nth-child(2) {
        left: 390px;
      }
      div:nth-child(3) {
        right: 108px;
      }
    }
    /deep/ .countdown-footer2 {
      div:nth-child(1) {
        left: 160px !important;
      }
      div:nth-child(2) {
        left: 345px !important;
      }
      div:nth-child(3) {
        right: 150px !important;
      }
    }
  }
  .ticket {
    width: 650px;
    min-height: 1209px;
    background-color: rgba($color: #e39e4b, $alpha: 0.1);
    padding: 30px;
    margin: 0 auto;
    margin-top: 25px;
    .ticket-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /deep/.ticket-left {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 469px;
        height: 683px;
        background: url("../../../static/image/nfts-img-bg.png");

        background-size: 100% 100%;
        .ticket-left-swiper {
          width: 400px;
          height: 617px;
          .swiper-slide {
            width: 400px !important;
            height: 617px !important;
            .img1 {
              width: 400px !important;
              height: 617px !important;
            }
          }

          .swiper-button-prev {
            width: 15px !important;
            height: 26px !important;
            left: -60px !important;
            z-index: 2 !important;
          }
          .swiper-button-next {
            width: 15px !important;
            height: 26px !important;
            left: 448px !important;
            z-index: 2 !important;
          }
        }
      }
      .ticket-right {
        width: 100%;
        margin-top: 30px;
        .ticket-top {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
        }
        .ticket-title {
          font-size: 34px;
          font-family: "BankGothic";
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 4px !important;
        }
        .icon-warning {
          width: 30px;
          height: 30px;
          background: url("../../../static/image/ticket-warning.png");
          background-size: 100% 100%;
          margin-left: 20px;
          border-radius: 50%;
        }
        .ticket-row:first-child {
          margin-bottom: 40px !important;
        }
        .ticket-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid rgba($color: #f76e23, $alpha: 0.5);

          .ticket-row {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 45px;
            .ticket-address:hover {
              cursor: pointer;
              border-bottom: 1px solid #fff !important;
            }
            .ticket-address {
              border-bottom: 1px solid transparent;
            }
            .ticket-row-title {
              font-size: 16px;
              font-family: "BankGothic";
              font-weight: 400;
              color: rgba(255, 255, 255, 0.6);
            }
            .ticket-row-text {
              font-size: 20px;
              font-family: "BankGothic";
              font-weight: 400;
              color: #ffffff;
            }
          }
        }

        .input-title {
          font-size: 14px;
          font-family: "BankGothic";
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 10px;
        }
        input {
          width: 270px;
          height: 50px;
          background: rgba(25, 8, 5, 0.5);
          border: 1px solid rgba(253, 154, 100, 0.5);
          font-size: 20px;
          font-family: "BankGothic";
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
          text-align: right;
          padding: 14px;
          outline: none;
          box-sizing: border-box;
        }

        .ticket-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
          .price {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: space-between;
            .price-title {
              font-size: 20px;
              font-family: "BankGothic";
              font-weight: 400;
              color: rgba(255, 255, 255, 0.6);
              letter-spacing: 4px !important;
            }
            .price-num {
              font-size: 44px;
              font-family: "BankGothic";
              font-weight: 400;
              color: #f76e23;
              letter-spacing: 4px !important;
            }
          }
          .mint {
            width: 210px;
            height: 50px;
            background: url("../../../static/image/ticket-nft-btn.png");
            background-size: 100% 100%;
            font-size: 30px;
            font-family: "BankGothic";
            font-weight: 400;
            color: #ffffff;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .footer {
    width: 650px;
    min-height: 262px;
    padding: 30px;
    margin: 0 auto;
    margin-top: 20px;
    .footer-title {
      font-size: 22px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 14px;
    }
    .footer-text {
      font-size: 14px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      opacity: 0.6;
      line-height: 24px;
    }
  }
}
</style>