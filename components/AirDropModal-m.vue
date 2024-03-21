<template>
  <div class="modal" :class="isAirdropModalShow ? 'show' : ''">
    <div class="dialog">
      <img
        src="../static/image/close-btn-m.png"
        class="close"
        @click="hide"
        alt=""
      />
      <div class="dialog-swiper">
        <AirDropSwiper-m />
        
      </div>
      <div class="dialog-content">
        <input
          type="text"
          v-model.trim="address"
          class="dialog-input"
          placeholder="BSC Wallet Address："
        />
        <input
          type="text"
          v-model.trim="ticketNumber"
          class="dialog-input"
          placeholder="Ticket NUMBER："
        />
        <input
          type="text"
          v-model.trim="userName"
          class="dialog-input"
          placeholder="Username："
        />

        <div class="btn" @click="confirm">redeem</div>
      </div>
      <div class="dialog-footer">
        <div class="dialog-title">Having a ticket you will:</div>
        <div class="dialog-line"></div>
        <div class="dialog-text">1. Enter Betamars World</div>
        <div class="dialog-text">
          2. Carve up Elonpunk worthing hundreds of thousands of dollars
        </div>
        <div class="dialog-text">3. Earn bonus</div>
        <div class="dialog-text">4. More rights are coming soon</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAirdrop, getTicketRare } from "@/api/tickets.js";
import { USERNAMEREG } from "@/common/regExp.js";
export default {
  name: "BetamarsAirdropmodalM",

  data() {
    return {
      imgBlob: "",
      date: "",
      randomNumber: "",
      userName: "",
      ticketNumber: "",
      address: "",
      imgUrl: "",
      imgUrl1: "",
      rare: "",
    };
  },
  props: {
    isAirdropModalShow: Boolean,
  },
  methods: {
    hide() {
      this.$emit("hideAirdropModal");
    },

    validation() {
      if (!this.address) {
        this.$message.warning("Please enter Wallet Address!");
        return false;
      }

      if (!this.ticketNumber) {
        this.$message.warning("Please enter Ticket Number!!");
        return false;
      }

      if (!this.userName) {
        this.$message.warning("Please enter Username!");
        return false;
      }

      if (!USERNAMEREG.test(this.userName)) {
        this.$message.warning(
          "Username should between 4-8 characters in upper case letters!"
        );
        return false;
      }
      return true;
    },
    resetForm() {
      this.address = "";
      this.ticketNumber = "";
      this.userName = "";
    },

    confirm() {
      if (!this.validation()) return;
      this.$emit("load");

      getAirdrop({
        ticketName: this.userName.toUpperCase(),
        code: this.ticketNumber,
        address: this.address,
      })
        .then((res) => {
          console.log(res);
          this.$emit("getAirdropSuccess", {
            imgUrl: res.data.nftUrl,
            id: res.data.rare,
            nftId: res.data.itemId,
          });

          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
          this.$emit("hideLoad");
          this.$message.warning(err.message);
        });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.show {
  position: relative !important;
  z-index: 1 !important;
  opacity: 1 !important;
  display: inherit !important;
}
.modal {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  opacity: 0;
  transition: all 0.5s;
  display: none;
  .dialog {
    position: relative;
    width: 750px;
    height: 1834px;
    padding-top: 180px;
    z-index: 1;
    .close {
      position: absolute;
      top: 110px;
      right: 32px;
      width: 42px;
      height: 42px;
    }
    &-swiper {
      width: 100%;
    }
    .dialog-content {
      width: 100%;
      padding: 30px 32px;
      .dialog-input {
        width: 686px;
        height: 90px;
        margin-bottom: 20px;
        font-size: 18px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #f76e23;
        text-align: center;
        letter-spacing: 2px;
        box-sizing: border-box;
        background: rgba(11, 8, 10, 0.5);
        outline: none;
        border: 1px solid #ff9b65;
        box-shadow: inset 0px 0px 21px 0px rgba(255, 170, 87, 0.5);
      }
      .btn {
        width: 282px;
        height: 94px;
        background: url("../static/image/airdrop-btn-m.png");
        background-size: 100% 100%;
        font-size: 32px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #f76e23;
        line-height: 94px;
        text-align: center;
        letter-spacing: 3px;
        margin: 0 auto;
      }
    }
    .dialog-footer {
      padding: 30px 32px;
      .dialog-title {
        font-size: 16px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #f76e23;
        letter-spacing: 1px;
        margin-bottom: 12px;
      }
      .dialog-line {
        width: 434px;
        height: 10px;
        background: url("../static/image/home-swiper-line.png");
        background-size: 100% 100%;
        margin-bottom: 20px;
      }
      .dialog-text {
        font-size: 16px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 12px;
      }
    }
  }
}
</style>

