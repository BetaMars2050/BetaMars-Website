<template>
  <div class="modal" :class="isShowConnectWalletModal ? 'show-modal' : ''">
    <div class="dialog">
      <div class="dialog-title">Connect Your Wallet</div>
      <div class="dialog-content">
        <div
          class="wallet-item"
          v-for="item in walletList"
          :key="item.id"
          :class="item.id > 3 ? 'disable' : 'active'"
          @click="connect(item)"
        >
          <div class="wallet-item-title">{{ item.name }}</div>
          <img :src="item.logoUrl" class="wallet-item-logo" alt="" />
        </div>
      </div>

      <div class="dialog-text">
        By connecting your wallet you accept our terms of use and privacy
        policy.
      </div>
      <div class="close" @click="hideModal"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { throttle } from "lodash";

import {
  connectMetaMask,
  connectWalletconnect,
  connectOkxWallet,
  signOut,
} from "@/common/connectWallet";
export default {
  name: "BetamarsConnectwalletmodal",
  data() {
    return {
      walletList: [
        {
          id: 1,
          name: "Metamask",
          logoUrl: require("../static/image/metamask-logo.png"),
        },
        {
          id: 2,
          name: "Wallet  Connect",
          logoUrl: require("../static/svg/WalletConnect.svg"),
        },
        { id: 3, name: "OKX Wallet", logoUrl: require("../static/svg/okx_wallet_icon.svg") },
        {
          id: 4,
          name: "BinanceChainWallet",
          logoUrl: require("../static/svg/BinanceChainWallet.svg"),
        },
        {
          id: 5,
          name: "SafePalWallet",
          logoUrl: require("../static/svg/SafePalWallet.svg"),
        },
        {
          id: 6,
          name: "MathWallet",
          logoUrl: require("../static/svg/MathWallet.svg"),
        },
      ],
    };
  },

  props: {
    isShowConnectWalletModal: Boolean,
  },
  mounted() {},
  methods: {
    hideModal() {
      this.$emit("hideConnectWalletModal");
    },
    connect(item) {
      switch (item.id) {
        case 1:
          this.connectMetaMaskWallet();
          break;
        case 2:
          this.connectWalletTool();
          break;
          case 3 :
          this.connectOkx();
          break;
        default:
          break;
      }
    },
    loginByWallet: throttle(async function () {
      try {
        let nonce = await this.$store.dispatch("getUserNonce");
        let sign = await this.$store.dispatch("getWalletSign", nonce);
        await this.$store.dispatch("walletLogin", sign);
        this.$message({
          message: "Connected wallet successfully!",
          type: "warning",
        });
        this.$loading.close();
      } catch (err) {
        console.log(err, "err");
        signOut();
        this.$loading.close();
        this.$message({
          message: "Fail to connect your wallet!",
          type: "warning",
        });
      }
    }, 300),
    connectWalletTool() {
      this.$loading.show({ text: "Connecting..." });
      connectWalletconnect()
        .then((res) => {
          this.$emit("hideConnectWalletModal");

          this.loginByWallet();
          console.log(res);
        })
        .catch((err) => {
          this.$message({
            message: "Fail to connect your wallet!",
            type: "warning",
          });
          this.$loading.close();

          console.log(err);
        });
    },
    connectOkx() {
      this.$loading.show({ text: "Connecting..." });
      connectOkxWallet()
        .then((result) => {
          console.log(result,'result');
          this.$emit("hideConnectWalletModal");

          this.loginByWallet();
        })
        .catch((err) => {
          this.$loading.close();

          this.$message({
            message: "Fail to connect your wallet!",
            type: "warning",
          });
          console.log(err);
        });
    },
    connectMetaMaskWallet() {
      this.$loading.show({ text: "Connecting..." });
      connectMetaMask()
        .then((result) => {
          console.log(result);
          this.$emit("hideConnectWalletModal");

          this.loginByWallet();
        })
        .catch((err) => {
          this.$loading.close();

          this.$message({
            message: "Fail to connect your wallet!",
            type: "warning",
          });
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.show-modal {
  opacity: 1 !important;
  z-index:4 !important;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(#000, 0.75);
  z-index: -1;
  opacity: 0;
  transition: all 0.5s;

  .dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 545px;
    min-height: 624px;
    background: url("../static/image/connect-wallet-modal-bg.png");
    background-size: 100% 100%;
    padding: 50px 36px 36px 36px;
    z-index: 4;

    .dialog-title {
      font-size: 24px;
      font-family: Ubuntu-Bold, Ubuntu;
      font-weight: bold;
      color: #ffffff;
    }
    .dialog-content {
      min-width: 472px;
      margin-top: 30px;
      .wallet-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 60px;
        background: #000000;
        transition: all 0.3s;
        margin-bottom: 12px;
        cursor: pointer;
        padding: 10px 20px;
        box-sizing: border-box;
        color: #ffffff;
        border: 1px solid rgba(#ff9000, 0.2);
        border-radius: 4px;
        .wallet-item-title {
          font-size: 24px;
          font-family: Ubuntu-Regular, Ubuntu;
          font-weight: 400;
        }
        .wallet-item-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .active:hover {
        background: #ff9000 !important;
        color: #ffffff !important;
      }
      .disable {
        background-color: rgba(#ccc, 0.3) !important;
        color: rgba(#fff, 0.3) !important;
        border: none !important;
        .wallet-item-logo {
          opacity: 0.4;
        }
      }
    }
    .dialog-text {
      width: 444px;
      font-size: 16px;
      font-family: Ubuntu-Regular, Ubuntu;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      margin-top: 8px;
    }
  }
  .close {
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 30px;
    height: 30px;
    background: url("../static/image/close.png");
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
