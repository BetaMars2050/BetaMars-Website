<template>
  <div class="betamars">
    <ImageLoading></ImageLoading>
  </div>
</template>

<script>
export default {
  middleware: "pageRedirect",
  name: "BetamarsIndex",
  data() {
    return {
      img: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.betamars {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
}
</style>