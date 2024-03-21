<template>
  <div class="land-item">
    <!-- @click="handleClick" -->
    <!-- <div class="staking" v-if="stakingIds.indexOf(land.id) > -1"></div> -->
    <el-image :src="land.Img" class="land-img" fit="cover">
      <div slot="placeholder" class="image-slot-placeholder">
        <ImageLoading></ImageLoading>
      </div>

      <div slot="error" class="image-slot-error">Loading failed</div>
    </el-image>
  </div>
</template>

<script>
export default {
  name: "BetamarsPersonalnftsland",

  data() {
    return {};
  },
  props: {
    id: { type: [Number, String] },
    land: Object,
    // stakingIds: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   },
    // },
  },
  mounted() {},

  methods: {
    handleClick() {
      this.$emit("landDetail", this.land);
    },
  },
};
</script>

<style lang="scss" scoped>
.land-item:nth-child(4n + 1) {
  margin-left: 0 !important;
}
// .staking {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 168px;
//   height: 157px;
//   background: url("../static/image/staking.png");
//   background-size: 100% 100%;
//   z-index: 2;
// }
.land-item {
  position: relative;
  width: 328px;
  height: 328px;
  margin-bottom: 30px;
  margin-left: 30px;

  cursor: pointer;
  .land-img {
    width: 328px;
    height: 328px;
    .image-slot-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 328px;
      height: 328px;
      font-size: 20px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
    }
    .image-slot-error {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 328px;
      height: 328px;
      font-size: 20px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>