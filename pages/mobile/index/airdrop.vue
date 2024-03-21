<template>
  <div class="airdrop-page">
    <div class="airdrop" :class="isAirdropModalShow ? 'airdrop-hide' : ''">
      <div class="airdrop-title airdrop-position">betamars migration plan</div>
      <div class="airdrop-text airdrop-position">free ticket nft giveaway</div>
      <div class="airdrop-desc airdrop-position">
        betamars closed beta test will be available soon ! sending 100u per
        ticket nft for free !come and build a free,equal and open world with us!
      </div>
      <!-- <div class="airdrop-countdown">
        <Countdown />
      </div> -->
      <!-- @click="open" -->
      <div class="airdrop-btn airdrop-position">claim nft</div>
    </div>
    <AirDropModal-m
      :isAirdropModalShow="isAirdropModalShow"
      @hideAirdropModal="hideAirdropModal"
      @getAirdropSuccess="getAirdropSuccess"
      @load="load"
      @hideLoad="hideLoad"
    ></AirDropModal-m>
    <GetAirDropModal-m
      :isShow="isGetAirdropSuccess"
      :imgUrl="imgUrl"
      :id="id"
      :nftId="nftId"
      :imgBlob="imgBlob"
      @hideGetAirdropModal="hideGetAirdropModal"
    ></GetAirDropModal-m>
    <Loading :isLoadingShow="isLoadingShow" />
  </div>
</template>

<script>
export default {
  name: "BetamarsAirdropMobile",

  data() {
    return {
      isAirdropModalShow: false,
      isGetAirdropSuccess: false,
      isLoadingShow: false,
      id: "",
      imgUrl: "",
      imgBlob: "",
      nftId: 1,
    };
  },

  mounted() {},

  methods: {
    open() {
      this.isAirdropModalShow = true;
    },
    hideAirdropModal() {
      this.isAirdropModalShow = false;
    },
    hideLoad() {
      this.isLoadingShow = false;
    },
    load() {
      this.isLoadingShow = true;
    },
    hideGetAirdropModal() {
      this.isGetAirdropSuccess = false;
    },

    getAirdropSuccess(e) {
      this.isLoadingShow = false;
      this.isAirdropModalShow = false;
      this.imgUrl = e.imgUrl;
      this.id = e.id;
      this.isGetAirdropSuccess = true;
      this.imgBlob = e.imgBlob;
      this.nftId = e.nftId;
    },
  },
};
</script>

<style lang="scss" scoped>
.airdrop-page {
  width: 100%;
  height: auto;
  background: url("../../../static/image/airdrop-bg-m.png");
  background-size: 100% 100%;
}
.airdrop-hide {
  position: absolute;
  z-index: -1 !important;
  opacity: 0 !important;
}
.airdrop {
  width: 100%;
  height: 1334px;
  transition: all 0.5s;
  &-title {
    width: 100%;
    top: 320px;
    font-size: 32px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #ededed;
    letter-spacing: 4px;
    text-align: center;
  }
  &-text {
    width: 536px;
    height: 60px;
    background: url("../../../static/image/airdrop-free-bg-m.png");
    background-size: 100% 100%;
    font-size: 24px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #f76e23;
    line-height: 60px;
    text-align: center;
    letter-spacing: 3px;
    top: 402px;
  }
  &-desc {
    width: 686px;
    height: 160px;
    font-size: 20px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    letter-spacing: 3px;
    text-align: center;
    top: 500px;
  }
  &-btn {
    width: 262px;
    height: 124px;
    color: rgba($color: #ccc, $alpha: 0.5);

    background: url("../../../static/image/airdrop_claim_btn_disable.png");
    background-size: 100% 100%;
    font-size: 24px;
    font-family: "BankGothic";
    font-weight: 400;
    line-height: 124px;
    text-align: center;
    letter-spacing: 3px;
    top: 720px;
  }
  &-position {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &-countdown {
    position: absolute;
    top: 840px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>