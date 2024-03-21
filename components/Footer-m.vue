<template>
  <div class="footer">
    <img src="../static/image/footer-logo-m.png" class="logo2" alt="" />
    <div class="social">
      <a
        :href="item.shareUrl"
        v-for="item in shareList"
        :key="item.id"
        target="_blank"
      >
        <img :src="item.imgUrl" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsFooterM",
  data() {
    return {
      shareList: [
        {
          id: 1,
          imgUrl: require("../static/image/icon_Twitter.png"),
          shareUrl: "https://twitter.com/Betamars2025",
        },
        {
          id: 2,
          imgUrl: require("../static/image/icon_Telegram.png"),
          shareUrl: "https://t.me/betamars",
        },
        {
          id: 3,
          imgUrl: require("../static/image/icon_discord.png"),
          shareUrl: "https://discord.gg/g4w4uwwrh4",
        },
        {
          id: 4,
          imgUrl: require("../static/image/icon_Facebook.png"),
          shareUrl: "https://www.facebook.com/profile.php?id=100075798009336",
        },
        {
          id: 5,
          imgUrl: require("../static/image/icon_medium.png"),
          shareUrl: "https://medium.com/@betamars2050",
        },
        {
          id: 6,
          imgUrl: require("../static/image/icon_youtube.png"),
          shareUrl: "https://www.youtube.com/channel/UCklN4kCSmOedOAMiQjoAQrw",
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../static/image/footer-bg-m.png");
  background-size: 100% 100%;
  z-index: 2;
  .logo2 {
    width: 398px;
    height: 41px;
  }
  .social {
    width: 496px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>