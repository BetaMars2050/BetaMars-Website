<template>
  <div class="modal" :class="isShow ? 'show-modal' : ''">
    <div class="dialog">
      <div class="title">Transfer</div>
      <div class="text">You need to change the networkin your wallet.</div>
      <div class="network-item">
        <img src="../static/image/bsc-logo.png" class="network-logo" alt="" />
        <div class="network">Binance Smart Chain</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsSwitchnetworkmodal",

  data() {
    return {};
  },
  props: {
    isShow: Boolean,
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.show-modal {
  opacity: 1 !important;
  z-index: 9 !important;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(#000, 0.75);
  z-index: -1;
  opacity: 0;
  transition: all 0.5s;
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    min-height: 206px;
    background: url("../static/image/network-modal-bg.png");
    background-size: 100% 100%;
    padding: 32px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .title {
      font-size: 26px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #fffefe;
      text-align: center;
    }
    .text {
      font-size: 14px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #fffefe;
      line-height: 22px;
      opacity: 0.6;
      letter-spacing: 1px;
      margin-top: 14px;
      margin-bottom: 20px;
      text-align: center;
    }
    .network-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .network-logo {
        width: 30px;
        height: 30px;
      }
      .network {
        font-size: 17px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #fffefe;
        letter-spacing: 1px;

        margin-left: 10px;
      }
    }
  }
}
</style>