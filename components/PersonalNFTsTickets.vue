<template>
  <div class="ticket-item">
    <el-image :src="item._img" class="ticket-img">
      <div slot="placeholder" class="image-slot-placeholder">
        <ImageLoading></ImageLoading>
      </div>

      <div slot="error" class="image-slot-error">Loading failed</div>
    </el-image>
    <!-- <div class="tickets-id">ID:{{ item.tokenId }}</div> -->
  </div>
</template>

<script>
export default {
  name: "BetamarsPersonalnftstickets",

  data() {
    return {};
  },
  props: {
    item: Object,
    index: [Number, String],
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.ticket-item:nth-child(4n + 1) {
  margin-left: 0 !important;
}
.ticket-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 328px;
  height: 518px;
  margin-left: 30px;
  margin-bottom: 30px;
  .ticket-img {
    width: 328px;
    height: 518px;
    .image-slot-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 328px;
      height: 518px;
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
      height: 518px;
      font-size: 20px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
    }
  }

  .tickets-id {
    width: 277px;
    height: 32px;
    font-size: 20px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 32px;
    background: url("../static/image/airdrop-id-bg.png");
    background-size: 100% 100%;
    margin-top: 14px;
    margin-bottom: 14px;
  }
}
</style>