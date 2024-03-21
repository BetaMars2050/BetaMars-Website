<template>
  <div class="header">
    <img src="../static/image/logo.png" class="logo" alt="" />
    <div class="header-right">
      <div class="header-btn" @click="openConnectWalletModal" v-if="!account">
        connect
      </div>
      <!-- @click="drop" -->
      <div v-else class="current-account">
        {{ currentAccount }}
      </div>
      <!-- <div
        class="account-dropdown"
        :class="isDropdown ? 'account-dropdown-active' : ''"
        v-if="account"
      >
        <div class="account-dropdown-item">My Profile</div>
        <div class="account-dropdown-item" @click="signOut">Sign out</div>
      </div> -->
      <img
        src="../static/image/menu-m.png"
        class="menu-img"
        alt=""
        @click="showOrHideMenu"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { signOut } from "@/common/connectWallet.js";
export default {
  name: "BetamarsPageheaderM",
  data() {
    return {
      isScroll: false,
      isDropdown: false,
    };
  },
  computed: {
    ...mapGetters(["account"]),
    currentAccount() {
      return (
        this.account.substring(0, 6) +
        "..." +
        this.account.substring(this.account.length - 6, this.account.length)
      );
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent);
    document.addEventListener("click", (e) => {
      if (
        !this.$el.contains(e.target) ||
        e.target.className === "menu-img" ||
        e.target.className === "header" ||
        e.target.className === "logo"
      )
        this.isDropdown = false;
    });
  },
  methods: {
    signOut() {
      signOut();
      this.isDropdown = false;
    },
    drop() {
      this.isDropdown = !this.isDropdown;
    },
    openConnectWalletModal() {
      this.$emit("openConnectWalletModal");
    },
    showOrHideMenu() {
      this.$emit("showOrHideMenu");
    },
    scrollEvent() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isScroll = scrollTop > 200 || scrollTop < 0 ? true : false;
      this.isDropdown = false;

      this.$emit("hideAsidemenu");
    },
  },
};
</script>

<style lang="scss" scoped>
// .header-bg {
//   background-color: rgba(#160f14, 0.8) !important;
// }
.header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 35px 0 40px;
  z-index: 3;
  background: #140e13;
  transition: all 0.5s;
  .logo {
    width: 240px;
    height: 24px;
  }
  .header-right {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .account-dropdown {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      position: absolute;
      top: 50px;

      width: 205px;
      height: 0px;
      background-color: rgba($color: #000000, $alpha: 0.5);
      transition: all 0.6s;

      z-index: -1;
      opacity: 0;
      border: 1px solid rgba(247, 110, 35, 0.5);
      border-bottom: none;
      overflow: hidden;
      .account-dropdown-item {
        width: 100%;
        height: 60px;
        font-size: 24px;
        text-align: center;
        line-height: 60px;
        color: #fff;
        font-family: "BankGothic";
        font-weight: 400;
        border-bottom: 1px solid rgba(247, 110, 35, 0.5);
        cursor: pointer;
      }
    }
    .account-dropdown-active {
      height: auto !important;
      min-height: 60px !important;
      z-index: 1 !important;
      opacity: 1 !important;
    }
    .header-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 149px;
      height: 59px;
      background: url("../static/image/header-btn-bg-m.png");
      background-size: 100% 100%;
      font-size: 16px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
    }
    .current-account {
      border-bottom: 2px solid #f76e23;
      font-size: 18px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ededed;
    }
    .menu-img {
      width: 51px;
      height: 42px;
      margin-left: 4px;
    }
  }
}
</style>