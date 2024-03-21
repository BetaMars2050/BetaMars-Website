<template>
  <div class="modal" :class="isLoadingShow ? 'show' : ''">
    <div class="loading-box">
      <img src="../static/image/loading.png" class="loading-img" alt="" />
      <div class="loading-text">loading...</div>
      <img
        src="../static/image/loading-circle.png"
        class="loading-circle"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
    };
  },
  props: {
    isLoadingShow: Boolean,
  },
  methods: {
  
  },
  created() {},
};
</script>

<style scoped lang="scss">
.show {
  display: inherit !important;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 6;
  transition: 0.5s all;
  .loading-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    z-index: 6;
    .loading-circle {
      position: absolute;
      top: -21px;
      left: -21px;
      width: 154px;
      height: 154px;
    }
    .loading-img {
      width: 110px;
      height: 110px;
      animation: rotateLoading 1s linear infinite;
      user-select: none;
      -webkit-user-select: none;
    }
    .loading-text {
      font-size: 21px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      margin-top: 10px;
    }
  }
}
@keyframes rotateLoading {
  0% {
    transform: rotate(0deg);
  }
  16% {
    transform: rotate(60deg);
  }
  32% {
    transform: rotate(120deg);
  }
  48% {
    transform: rotate(180deg);
  }
  64% {
    transform: rotate(240deg);
  }
  80% {
    transform: rotate(300deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
