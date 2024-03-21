<template>
  <div class="">
    <div v-swiper:mySwiper="swiperOption" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, idx) in swiperData" :key="idx">
          <img :src="item.imgUrl" class="img1" />
        </div>
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      swiperOption: {
        speed: 1000,
        autoplay: true,

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
.swiper-slide {
  width: 320px !important;
  height: 504px !important;
  .img1 {
    width: 320px !important;
    height: 504px !important;
    user-select: none;
    -webkit-user-select: none;
  }
}
.swiper-button-prev {
  width: 40px !important;
  height: 40px !important;
  left: -30px !important;
  background: url("../static/image/ticket-sale-swiper-arrow.png") no-repeat;
  background-size: 100% 100%;
  z-index: 1 !important;
}
.swiper-button-next {
  width: 40px !important;
  height: 40px !important;
  right: -30px !important;
  z-index: 1 !important;

  background: url("../static/image/ticket-sale-swiper-arrow.png") no-repeat;
  background-size: 100% 100%;
  transform: rotate(180deg);
}
</style>
