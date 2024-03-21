<template>
  <img src="../static/image/loading.png" class="loading-img" alt="" />
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loading-img {

  width: 80px;
  height: 80px;
  animation: rotateLoading 1s linear infinite;
  user-select: none;
  -webkit-user-select: none;
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