<template>
  <div class="footer">
    <img src="../static/image/footer-logo-m.png" class="footer-logo" alt="" />
    <div class="list">
      <a
        v-for="item in shareList"
        :href="item.shareUrl"
        target="_blank"
        class="share-icon"
        :key="item.id"
      >
        <img :src="item.imgUrl" alt=""
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsPagefooter",

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: #0c0d0e;
  .footer-logo{
    width: 320px;
    height: 32px;
  }
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 540px;
    margin-top: 40px;
    a {
      display: block;
      width: 32px;
      height: 32px;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>