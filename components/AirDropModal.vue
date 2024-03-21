<template>
  <div class="mask" :class="isShow ? 'show' : ''">
    <div class="modal">
      <div class="close-box" @click="hide">
        <img
          src="../static/image/airdrop_modal_close.png"
          class="close"
          alt=""
        />
      </div>
      <div class="modal-left">
        <AirDropSwiper />
      </div>
      <div class="line"></div>
      <div class="modal-right">
        <input
          type="text"
          v-model.trim="address"
          class="input"
          placeholder="BSC Wallet Address："
        />
        <input
          type="text"
          v-model.trim="ticketNumber"
          class="input"
          placeholder="Ticket NUMBER："
        />
        <input
          type="text"
          v-model.trim="userName"
          class="input"
          placeholder="Username："
        />
        <div class="btn" @click="confirm">Redeem​</div>

        <div class="bottom">
          <div class="bottom-top">
            <div class="bottom-title">Having a ticket you will:</div>
            <div class="bottom-line"></div>
          </div>
          <div class="bottom-text">
            <div>1. Enter Betamars World</div>
            <div>
              2. Carve up Elonpunk worthing hundreds of thousands of dollars
            </div>
            <div>3. Earn bonus</div>
            <div>4. More rights are coming soon</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAirdrop, getTicketRare } from "@/api/tickets.js";
import { USERNAMEREG } from "@/common/regExp.js";

export default {
  name: "",
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
    isShow: Boolean,
  },
  methods: {
    hide() {
      this.$emit("hideAirDropModal");
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

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s;
  z-index: -1;
  background-color: rgba($color: #000000, $alpha: 0.3);
  opacity: 0;
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1224px;
  min-height: 647px;
  background: url("../static/image/airdrop_modal_bg.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 50px;
  padding-right: 50px;
  .close-box {
    position: absolute;
    top: 22px;
    right: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 30px;
    cursor: pointer;
    .close {
      width: 15px;
      height: 15px;
    }
  }

  .modal-left {
    width: 310px;
    height: 100%;
    margin-right: 40px;
  }
  .modal-right {
    flex: 1;
    height: 100%;
    padding-left: 30px;
    .input {
      width: 733px;
      height: 69px;
      background: rgba(11, 8, 10, 0.5);
      font-size: 18px;
      font-family: "BankGothic";
      font-weight: 400;
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 15px;
      outline: none;
      text-align: center;
      border: 1px solid #fd9a64;
      box-shadow: rgba($color: #ffaa57, $alpha: 0.5) 0px 0px 20px inset;
    }

    .btn {
      width: 250px;
      height: 72px;
      background: url("../static/image/get_airdrop_btn.png");
      background-size: 100% 100%;
      margin: 0 auto;
      font-size: 18px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      line-height: 72px;
      text-align: center;
      cursor: pointer;
    }
    .bottom {
      margin-top: 25px;
      .bottom-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bottom-title {
          font-size: 16px;
          font-family: BankGothic;
          font-weight: 400;
          color: #f76e23;
        }
        .bottom-line {
          width: 450px;
          height: 4px;
          background: url("../static/image/airdrop_line.png");
          background-size: 100% 100%;
        }
      }
      .bottom-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-top: 20px;
        div {
          font-size: 16px;
          font-family: "BankGothic";
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .line {
    width: 1px;
    height: 483px;
    background-color: #ffaa57;
  }
}

.show {
  // display: block !important;
  opacity: 1;
  z-index: 5;
}
</style>
