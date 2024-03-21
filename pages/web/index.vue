<template>
  <div class="">
    <PageHeader @openConnectWalletModal="openConnectWalletModal" />
    <!-- <AsideMenu /> -->
    <div class="">
      <nuxt-child @openConnectWalletModal="openConnectWalletModal" />
    </div>
    <PageFooter></PageFooter>
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
  middleware: "pageRedirect",
  name: "",
  scrollToTop: true,

  data() {
    return {
      isShowConnectWalletModal: false,
    };
  },
  computed: {
    ...mapGetters(["isNetworkModalShow"]),
  },
  methods: {
    openConnectWalletModal() {
      this.isShowConnectWalletModal = !this.isShowConnectWalletModal;
    },
  },
  mounted() {},
  created() {
    checkWalletConnectStatus();
  },
};
</script>

<style scoped lang="scss">
html,
body {
  width: 100%;
  overflow-x: auto;
  min-width: 1000px; /*no*/
  max-width: 100%;
}
</style>
