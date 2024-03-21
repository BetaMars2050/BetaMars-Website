<template>
  <div class="info">
    <div class="avatar">
      <img src="../static/image/test-avatar.png" alt="" />
    </div>
    <div class="info-name">
      <div class="username">Mamba Cobra</div>
      <img src="../static/image/copy-icon.png" alt="" />
    </div>
    <div class="identity">Identity:Miner/Lord</div>
    <div class="switch-identity">Change Identity</div>
  </div>
</template>

<script>
export default {
  name: "BetamarsPersonalinfo",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 168px;
    height: 168px;
    background: url("../static/image/my-avatar-bg.png");
    background-size: 100% 100%;
    margin-top: 28px;
    img {
      width: 156px;
      height: 156px;
    }
  }

  .info-name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    .username {
      font-size: 32px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
    }
    img {
      width: 22px;
      height: 26px;
      margin-left: 6px;
      cursor: pointer;
    }
  }
  .identity {
    font-size: 26px;
    font-family: "BankGothic";
    font-weight: normal;
    color: #ffffff;
    line-height: 49px;
    opacity: 0.6;
    margin-bottom: 2px;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.18);
  }
  .switch-identity {
    width: 320px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 23px;
    font-family: "BankGothic";
    font-weight: normal;
    color: #ffffff;
    background: url("../static/image/switch-btn.png");
    background-size: 100% 100%;
  }
}
</style>