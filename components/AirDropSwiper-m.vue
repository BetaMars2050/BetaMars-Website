<template>
  <div class="airdrop-swiper-box">
    <div class="airdrop-swiper">
      <div v-swiper:mySwiper="swiperOption" class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, idx) in swiperData"
            :key="idx"
          >
            <img :src="item.imgUrl" class="img1" />
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
export default {
  name: "BetamarsAirdropswiperM",

  data() {
    return {
      swiperOption: {
        autoplay: true,
        speed: 1000,

        loop: true,
        observer: true,
        observeParents: true,
        autoplayDisableOnInteraction: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperData: [
        { imgUrl: require("../static/image/tickets1.png") },
        { imgUrl: require("../static/image/tickets2.png") },
      ],
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped lang="scss">
.airdrop-swiper-box {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.airdrop-swiper {
  width: 400px !important;
}
.swiper-slide {
  width: 400px !important;
  height: 614px !important;
  .img1 {
    width: 400px !important;
    height: 614px !important;
    user-select: none;
    -webkit-user-select: none;
  }
}
.swiper-button-prev {
  left: 30px;
  width: 28px !important;
  height: 48px !important;
  background: url("../static/image/next-m.png") no-repeat;
  background-size: 100%;
  outline: none;
}
.swiper-button-next {
  transform: rotate(180deg);
  right: 30px;
  width: 28px !important;
  height: 48px !important;
  background: url("../static/image/next-m.png") no-repeat;
  background-size: 100%;
  outline: none;
}
</style>
