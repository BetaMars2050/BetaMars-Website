<template>
  <div>
    <PageHeader-m
      @showOrHideMenu="showOrHideMenu"
      @hideAsidemenu="hideAsidemenu"
      @openConnectWalletModal="openConnectWalletModal"
    />
    <AsideMenu-m :showMenu="showMenu" @hideMenu="hideAsidemenu" />
    <div class="container">
      <nuxt-child />
      <Footer-m></Footer-m>
    </div>
    <ConnectWalletModal
      :isShowConnectWalletModal="isShowConnectWalletModal"
      @hideConnectWalletModal="openConnectWalletModal"
    ></ConnectWalletModal>
    <SwitchNetworkModal :isShow="isNetworkModalShow" />
  </div>
</template>

<script>
import { checkWalletConnectStatus } from "@/common/connectWallet";
import { mapGetters } from "vuex";
export default {
  middleware({ route, redirect, from }) {
    if (route.path == "/mobile" || route.path == "/mobile/") {
      return redirect("/mobile/home");
    }
  },

  data() {
    return {
      isShowConnectWalletModal: false,
      showMenu: false,
    };
  },
  computed: {
    ...mapGetters(["isNetworkModalShow"]),
  },
  created() {
    checkWalletConnectStatus();
  },
  mounted() {},
  methods: {
    openConnectWalletModal() {
      this.isShowConnectWalletModal = !this.isShowConnectWalletModal;
    },
    hideAsidemenu() {
      this.showMenu = false;
    },
    showOrHideMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
</style>