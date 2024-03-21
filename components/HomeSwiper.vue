<template>
  <div class="swiper-box">
    <div class="swiper-content">
      <template v-if="currentIndex === 0">
        <div class="swiper-title swiper-title1">
          <img src="../static/image/swiper-title1.png" alt="" />
        </div>
        <div>
          <img src="../static/image/row-right.png" class="swiper-line" alt="" />
          <div class="swiper-text">
            Land NFT is the credential to activate the Lord's identity, and it
            is also a vital asset. Owning the land to contribute to the BetaMars
            development will gain a large amount of EP rewards.
          </div>
          <div class="swiper-btn">GET</div>
        </div>
      </template>

      <template v-if="currentIndex === 1">
        <div class="swiper-title swiper-title2">
          <img src="../static/image/swiper-title2.png" alt="" />
        </div>
        <div>
          <img src="../static/image/row-right.png" class="swiper-line" alt="" />

          <div class="swiper-text">
            Ticket NFT is the credential to activate the Miner's identity. Enter
            the game as a Miner to earn Elonpunk and Revo token rewards by
            building and exploring the BetaMars world.
          </div>
          <div
            class="swiper-btn"
            style="background-color: #ff9000"
            @click="navigate"
          >
            GET
          </div>
        </div>
      </template>

      <template v-if="currentIndex === 2">
        <div class="swiper-title swiper-title3">
          <img src="../static/image/swiper-title3.png" alt="" />
        </div>
        <div>
          <div class="swiper-row">
            <div class="swiper-row-title">Play and earn</div>
            <img
              src="../static/image/row-right.png"
              class="swiper-row-line"
              alt=""
            />
          </div>
          <div class="swiper-text">
            Explore the Land NFT resources in BetaMars 1.0 by yourself or
            inviting your friends to earn token rewards.
          </div>
          <div class="swiper-row">
            <div class="swiper-row-title">Social</div>
            <img
              src="../static/image/row-right.png"
              class="swiper-row-line"
              alt=""
            />
          </div>
          <div class="swiper-text">
            A unique social system is in the BetaMars game! Make friends to
            explore the world together!
          </div>
          <div class="swiper-row">
            <div class="swiper-row-title">Creation</div>
            <img
              src="../static/image/row-right.png"
              class="swiper-row-line"
              alt=""
            />
          </div>
          <div class="swiper-text">
            In BetaMars 2.0, creating games, concerts, communities to show your
            talents in BetaMars!
          </div>
          <div class="swiper-btn2">Start Now</div>
        </div>
      </template>
    </div>
    <div v-swiper:mySwiper="swiperOption" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, idx) in swiperData" :key="idx">
          <img :src="item.imgUrl" class="img1" />
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      currentIndex: 0,
      swiperOption: {
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        autoplay: true,
        speed: 800,
        loop: false,
        autoplayDisableOnInteraction: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperData: [
        { imgUrl: require("../static/image/home_banner_1.png") },
        { imgUrl: require("../static/image/home_banner_2.png") },
        { imgUrl: require("../static/image/home_banner_3.png") },
      ],
    };
  },

  watch: {},
  methods: {
    navigate() {
      this.$router.push({ path: "/web/marketplace/ticket-sale" });
    },
  },
  mounted() {
    this.mySwiper.on("activeIndexChange", (e) => {
      this.currentIndex = this.mySwiper.activeIndex;
    });
  },
  created() {},
};
</script>

<style  lang="scss" scoped>
.swiper-box {
  width: 1660px;
  height: 624px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.swiper-content {
  flex: 1;
  height: 100%;
  padding-top: 70px;
  .swiper-text {
    width: 578px;
    font-size: 16px;
    font-family: Ubuntu-Regular, Ubuntu;
    font-weight: 400;
    color: #ffffff;
    line-height: 28px;
    letter-spacing: normal;
    animation: ElFadeUp 0.8s ease;
    -webkit-animation: ElFadeUp 0.8s ease;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .swiper-title1 {
    padding-left: 114px;
    img {
      width: 190px;
      height: 32px;
    }
  }
  .swiper-title2 {
    padding-left: 100px;
    img {
      width: 220px;
      height: 32px;
    }
  }
  .swiper-title3 {
    padding-left: 20px;
    img {
      width: 320px;
      height: 32px;
    }
  }

  .swiper-title {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    width: 1474px;
    height: 70px;
    background: url("../static/image/swiper-title-bg.png");
    background-size: 100% 100%;
    animation: ElFadeUp 0.8s ease;
    -webkit-animation: ElFadeUp 0.8s ease;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    z-index: 2;
  }
  .swiper-line {
    display: block;
    width: 214px;
    height: 10px;
    margin-top: 134px;
    margin-bottom: 35px;
    animation: ElFadeUp 0.8s ease;
    -webkit-animation: ElFadeUp 0.8s ease;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .swiper-row {
    height: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 30px;
    animation: ElFadeUp 0.8s ease;
    -webkit-animation: ElFadeUp 0.8s ease;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    .swiper-row-title {
      font-size: 24px;
      font-family: Ubuntu;
      font-weight: 400;
      color: #ff9000;
    }
    .swiper-row-line {
      width: 214px;
      height: 10px;
      padding-top: 8px;
      margin-left: 10px;
    }
  }

  .swiper-btn2 {
    width: 160px;
    height: 40px;
    border-radius: 4px;
    background-color: #a7a7a7;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    font-family: Ubuntu-Bold, Ubuntu;
    font-weight: bold;
    color: #ffffff;
    margin-top: 30px;
    animation: ElFadeUp 0.8s ease;
    -webkit-animation: ElFadeUp 0.8s ease;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .swiper-btn {
    width: 160px;
    height: 40px;
    border-radius: 4px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    font-family: Ubuntu-Bold, Ubuntu;
    font-weight: bold;
    color: #ffffff;
    margin-top: 120px;
    animation: ElFadeUp 0.8s ease;
    -webkit-animation: ElFadeUp 0.8s ease;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    cursor: pointer;
    background-color: #a7a7a7;
  }
}
.swiper-container {
  width: 909px !important;
  height: 616px !important;
}
.swiper-slide {
  width: 909px !important;
  height: 616px !important;
  .img1 {
    width: 909px !important;
    height: 616px !important;
    user-select: none;
    -webkit-user-select: none;
  }
}
/deep/.swiper-pagination .swiper-pagination-bullet {
  background-color: #fff;
  width: 14px;
  height: 14px;
  margin: 0 10px !important;
  cursor: pointer;
}
/deep/.swiper-pagination-bullet-active {
  background-color: #fff;
}
.swiper-button-prev {
  position: absolute;
  width: 60px !important;
  height: 60px !important;
  top: 50%;
  left: -80px !important;
  transform: translate(-50%, 0);
  background: url("../static/image/home-swiper-arrow-left.png") no-repeat;
  background-size: 100%;
  z-index: 2;
}
.swiper-button-next {
  width: 60px !important;
  height: 60px !important;
  left: 688px !important;
  background: url("../static/image/home-swiper-arrow-right.png") no-repeat;

  background-size: 100%;
}
@keyframes ElFadeUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0%, 0);
    transform: translate3d(0, 0%, 0);
  }
}
</style>
