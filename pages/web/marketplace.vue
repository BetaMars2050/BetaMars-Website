<template>
  <div class="">
    <MarketplacePageHeader @openConnectWalletModal="openConnectWalletModal" />
    <!-- <AsideMenu /> -->
    <div>
      <nuxt-child
        keep-alive
        :keep-alive-props="{ include: ['BetamarsMyNFTs'] }"
        @openConnectWalletModal="openConnectWalletModal"
      />
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
  name: "BetamarsMarket",
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
