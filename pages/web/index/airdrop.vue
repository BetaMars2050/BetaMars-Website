<template>
  <div class="airdrop">
    <div
      class="airdrop-container"
      :class="isShow ? 'airdrop-container-hide' : ''"
    >
      <div class="title">Betamars Migration Plan</div>
      <div class="tickets-text">FREE TICKET NFT GIVEAWAY</div>
      <p>BETAMARS CLOSED BETA TEST WILL BE AVAILABLE SOON!</p>
      <p>sending 100U per ticket NFT for free!</p>
      <p>Come and build a free, equal and open world with us!</p>
      <!-- <div class="countdown">
        <Countdown />
      </div> -->
      <div class="btn" @click="isShow = true">CLAIM NFT</div>
    </div>
    <AirDropModal
      :isShow="isShow"
      @hideAirDropModal="hideAirDropModal"
      @getAirdropSuccess="getAirdropSuccess"
      @load="load"
      @hideLoad="hideLoad"
    />
    <GetAirDropModal
      :imgUrl="imgUrl"
      :id="id"
      :nftId="nftId"
      @hideGetAirdropModal="hideGetAirdropModal"
      :isShow="isGetAirdropModalShow"
    />
    <Loading :isLoadingShow="isLoadingShow" />
  </div>
</template>

<script>
export default {
  scrollToTop: true,

  name: "airdrop",
  data() {
    return {
      isGetAirdropModalShow: false,
      isShow: false,
      isLoadingShow: false,
      id: "",
      imgUrl: "",
      nftId: 1,
    };
  },
  methods: {
    hideAirDropModal() {
      this.isShow = false;
    },
    hideLoad() {
      this.isLoadingShow = false;
    },
    load() {
      this.isLoadingShow = true;
    },
    hideGetAirdropModal() {
      this.isGetAirdropModalShow = false;
    },

    getAirdropSuccess(e) {
      this.isLoadingShow = false;
      this.isShow = false;
      this.imgUrl = e.imgUrl;
      this.id = e.id;
      this.isGetAirdropModalShow = true;
      this.nftId = e.nftId;
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.airdrop {
  width: 100%;
  height: 1080px;
  background: url("../../../static/image/airdrop_bg.png");
  background-size: 100% 100%;

  .airdrop-container-hide {
    opacity: 0 !important;
    z-index: -1;
  }
  .airdrop-container {
    position: absolute;
    top: 252px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 1154px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    align-items: center;
    transition: all 0.5s;
    .title {
      font-size: 60px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ededed;
      text-align: center;
      letter-spacing: 4px;
    }
    .tickets-text {
      font-size: 29px;
      letter-spacing: 4px;
      text-align: center;

      font-family: "BankGothic";
      font-weight: 400;
      color: #f76e23;
      margin-bottom: 40px;
      margin-top: 10px;
      background: url("../../../static/image/airdrop_tickets_bg.png");
      width: 843px;
      height: 66px;
      line-height: 66px;
      background-size: 100% 100%;
    }
    p {
      letter-spacing: 2px;
      font-size: 24px;
      text-align: center;
      margin-bottom: 16px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      span {
        color: #f76e23;
      }
    }
    .countdown {
      margin-top: 20px;
    }
    .btn {
      width: 404px;
      letter-spacing: 2px;
      height: 158px;
      text-align: center;
      line-height: 158px;
      font-size: 29px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #f76e23;
      // color: rgba($color: #ccc, $alpha: .5);
      background: url("../../../static/image/airdrop-btn-bg.png");
      background-size: 100% 100%;
      margin-top: 30px;
      cursor: pointer;
    }
  }
}
</style>
