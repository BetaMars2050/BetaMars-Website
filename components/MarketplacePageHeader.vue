<template>
  <div class="header">
    <!-- :class="isScroll ? 'header-bg' : ''" -->
    <div class="header-left">
      <img
        src="../static/image/logo.png"
        class="logo"
        alt=""
        @click="
          handleClick({
            url: '/web/home',
          })
        "
      />
    </div>
    <div class="header-center">
      <div
        class="item"
        v-for="item in menuList"
        :key="item.id"
        :class="[
          currentId === item.id ? 'current-menu-item' : '',
          item.url ? '' : 'opacity',
        ]"
        @click="handleClick(item)"
      >
        {{ item.name.toUpperCase() }}
      </div>
    </div>
    <div class="header-right">
      <div class="connect-btn" @click="openConnectWalletModal" v-if="!account">
        CONNECT
      </div>
      <div v-else class="current-account">{{ currentAccount }}</div>
    </div>
    <!-- <div class="header-right">
      <div class="header-share-box">
        <a
          v-for="item in shareList"
          :href="item.shareUrl"
          target="_blank"
          class="share-icon"
          :key="item.id"
        >
          <img :src="item.imgUrl" alt=""
        /></a>
      </div>

    

    </div> -->
  </div>
</template>

<script>
import { signOut } from "@/common/connectWallet.js";
import { mapGetters } from "vuex";
export default {
  name: "BetamarsMarketPageHeader",
  data() {
    return {
      isScroll: false,
      activityId: 0,
      currentId: 2,

      menuList: [
        {
          id: 1,
          name: "Land Mystery Box Auction",
          url: "",
          routeName: "",
          // /web/marketplace/mystery-box-auction
          // web-marketplace-mystery-box-auction
        },
        {
          id: 2,
          name: "Ticket NFT Sale",
          url: "/web/marketplace/ticket-sale",
          routeName: "web-marketplace-ticket-sale",
        },
        // {
        //   id: 3,
        //   name: "Land Whitelist Sale",
        //   url: "/web/marketplace/land-whitelist-sale",
        //   routeName: "web-marketplace-land-whitelist-sale",
        // },
        {
          id: 3,
          name: "MY NFTS",
          url: "/web/marketplace/my-NFTs",
          routeName: "web-marketplace-my-NFTs",
        },
      ],
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
  watch: {
    $route: {
      handler: function (val, olVal) {
        this.changeCurrentId();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    signOut() {
      signOut();
    },
    openConnectWalletModal() {
      this.$emit("openConnectWalletModal");
    },
    changeCurrentId() {
      console.log(this.$route.name);
      this.menuList.map((v) => {
        if (this.$route.name.indexOf(v.routeName) !== -1) {
          this.currentId = v.id;
          console.log(v, "ssss");
        }
      });
    },
    handleClick(item) {
      if (item.id === 3 && !this.account) {
        this.$emit("openConnectWalletModal");
        return false;
      }

      if (item.url) {
        this.$router.push({ path: item.url });
        this.currentId = item.id;
      }
    },
    navigateTo(url, id) {
      this.$router.push({ path: url });
      if (id) {
        this.currentId = id;
      }
    },
    // scrollEvent() {
    //   var scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;

    //   this.isScroll = scrollTop > 50 ? true : false;
    // },
  },
  mounted() {
    // window.addEventListener("scroll", this.scrollEvent);
  },
  created() {},
};
</script>

<style scoped lang="scss">
.header-bg {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
.header {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 0 50px;
  background: #09090c;
  z-index: 3;
  transition: all 0.5s;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 100%;
    .logo {
      width: 260px;
      height: 26px;
      cursor: pointer;
    }
  }

  .header-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    height: 100%;
    padding-right: 530px;
    padding-left: 100px;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 16px;
      font-family: Ubuntu-Bold, Ubuntu;
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
      letter-spacing: normal;
    }
    .activity:hover .activity-down {
      height: 110px !important;
      opacity: 1 !important;
      z-index: 20px !important;
    }
    .activity-down:hover {
      height: 110px !important;
      opacity: 1 !important;
      z-index: 20px !important;
    }
    .activity-down {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translate(-50%, 0);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 170px;
      height: 0px;
      background-color: #09090c;
      opacity: 0;
      z-index: -1;
      overflow: hidden;
      transition: all 0.4s;
      .current-activity-item {
        color: #f76e23 !important;
      }
      .activity-down-item {
        width: 100%;
        height: 55px;
        text-align: center;
        line-height: 55px;
        font-size: 16px;
        font-family: Ubuntu-Bold, Ubuntu;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
        letter-spacing: normal;
      }
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 170px;
    height: 100%;
    .connect-btn {
      font-size: 16px;
      font-family: Atami;
      font-weight: bold;
      color: #ffffff;
      border-bottom: 2px solid #f76e23;

      cursor: pointer;
    }
    .current-account {
      border-bottom: 2px solid #f76e23;
      font-size: 16px;
      font-family: Atami;
      font-weight: bold;

      color: #ffffff;
      cursor: pointer;
    }
  }

  // .header-right {
  //   position: relative;
  //   display: flex;
  //   align-items: center;
  //   height: 100%;

  //   .account-dropdown {
  //     position: absolute;
  //     right: -1px;
  //     top: 80px;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     flex-wrap: wrap;
  //     width: 210px;
  //     height: 0;
  //     background-color: transparent;
  //     transition: all 0.6s;
  //     z-index: -1;
  //     opacity: 0;
  //     border: 1px solid rgba(247, 110, 35, 0.5);
  //     border-bottom: none;
  //     border-top: none;
  //     overflow: hidden;
  //     .account-dropdown-item {
  //       width: 100%;
  //       height: 60px;
  //       font-size: 24px;
  //       text-align: center;
  //       line-height: 60px;
  //       color: #fff;
  //       font-family: "BankGothic";
  //       font-weight: 400;
  //       border-bottom: 1px solid rgba(247, 110, 35, 0.5);
  //       cursor: pointer;
  //     }
  //   }
  //   .current-account:hover + .account-dropdown {
  //     height: auto !important;
  //     min-height: 60px !important;
  //     opacity: 1 !important;
  //     z-index: 1 !important;
  //   }
  //   .account-dropdown:hover {
  //     height: auto !important;
  //     min-height: 60px !important;
  //     opacity: 1 !important;
  //     z-index: 1 !important;
  //   }

  //   .account-dropdown-active {
  //     height: auto !important;
  //     min-height: 60px !important;
  //     border: 1px solid rgba(247, 110, 35, 0.5);
  //     border-bottom: none;
  //     z-index: 1 !important;
  //   }
  //   .header-share-box {
  //     display: flex;
  //     .share-icon {
  //       width: 32px;
  //       height: 32px;
  //       border-radius: 50%;
  //       margin-left: 40px;
  //       img {
  //         border-radius: 50%;

  //         width: 100%;
  //         height: 100%;
  //       }
  //     }
  //   }

  // }
}
.activity {
  position: relative;
}
.opacity {
  opacity: 0.4;
}
.current-menu-item {
  color: #f76e23 !important;
}
.hot {
  width: 16px;
  height: 18px;
  margin-left: 4px;
  padding-bottom: 2px;
}
</style>
