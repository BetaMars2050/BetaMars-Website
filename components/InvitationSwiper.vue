<template>
  <swiper
    class="swiper swiper-no-swiping"
    :dir="reverse ? 'rtl' : ''"
    :options="swiperOption"
  >
    <swiper-slide v-for="item in swiperList" :key="item.id"
      ><img :src="item.url" alt="" />
      <div class="swiper-text">{{ item.name }}</div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [
        {
          id: 1,
          name: "2x2 Land NFT",
          url: require("../static/image/2x2.jpg"),
        },
        {
          id: 2,
          name: "4x4 Land NFT",
          url: require("../static/image/4x4.jpg"),
        },
        {
          id: 3,
          name: "4x8 Land NFT",
          url: require("../static/image/4x8.jpg"),
        },
        {
          id: 4,
          name: "8x4 Land NFT",
          url: require("../static/image/8x4.jpg"),
        },
        {
          id: 5,
          name: "8x8 Land NFT",
          url: require("../static/image/8x8.jpg"),
        },
        {
          id: 6,
          name: "Ticket NFT",
          url: require("../static/image/swiper-ticket.jpg"),
        },
        {
          id: 7,
          name: "Ticket NFT",
          url: require("../static/image/swiper-ticket2.png"),
        },
        {
          id: 8,
          name: "Points",
          url: require("../static/image/points.jpg"),
        },
      ],
      swiperOption: {
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
        loop: true,
        speed: 3000,
        spaceBetween: 30,
        slidesPerView: "auto",
        loopedSlides: 8,
        updateOnWindowResize: false,
        autoplay: {
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      },
    };
  },
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  height: 300px;
  width: 1420px;
  margin: 0 auto;
  margin-bottom: 40px;
  .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 240px;
    height: 280px;

    img {
      width: 240px;
      height: 240px;
      -webkit-user-drag: none;
      user-drag: none;
      -moz-user-drag: none;
      -ms-user-drag: none;
      -o-user-drag: none;
    }
    .swiper-text {
      font-size: 16px;
      font-family: Ubuntu;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      margin-top: 12px;
    }
  }
}
/deep/ .swiper-wrapper {
  -webkit-transition-timing-function: linear !important; /*之前是ease-out*/
  -moz-transition-timing-function: linear !important;
  -ms-transition-timing-function: linear !important;
  -o-transition-timing-function: linear !important;
  transition-timing-function: linear !important;
}
</style>