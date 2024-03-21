<template>
  <div>
    <div class="banner"></div>
  <div class="bg">
        <div class="auction">
      <img src="../../../static/image/mystery-box.png" class="box-img" alt="" />
      <div class="content">
        <div class="title">Land Mystery Box Auction</div>
        <div class="desc">
          Four different acreage Land NFT (2*2, 4*4,4*8, 8*8) can be opened in
          the BetaMars Land NFT mystery box. Land NFT is a necessary condition
          to activate Lord's identity in BetaMars world.
        </div>
        <div class="content-row">
          <div class="item">
            <div>Mystery Boxes</div>
            <div>145</div>
          </div>
          <div class="item">
            <div>Bidders</div>
            <div>68969</div>
          </div>
          <div class="item">
            <div>Bid</div>
            <div>56465</div>
          </div>
        </div>
        <div class="price">0.3ETH</div>
        <el-input-number v-model="num" :step="0.001" :min="0.001" :max="999"></el-input-number>
        <div class="btn">BID</div>
      </div>
    </div>
  </div>
<div class="bottom">
        <div class="row">
      <div class="row-left"></div>
      <img src="../../../static/image/available-NFT.png" class="row-title" alt="" />
      <div class="row-right"></div>
    </div>
    <div class="land">
      <img src="../../../static/image/2x2.jpg" alt="" />
      <img src="../../../static/image/4x4.jpg" alt="" />
      <img src="../../../static/image/4x8.jpg" alt="" />
      <img src="../../../static/image/8x4.jpg" alt="" />
      <img src="../../../static/image/8x8.jpg" alt="" />
    </div>
</div>
  </div>
</template>

<script>
export default {
  name: "BetamarsMysteryBoxAuction",

  data() {
    return {
      num: 1,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 600px;
  background: url("../../../static/image/auction-banner.png");
  background-size: 100% 100%;
  margin-top: 100px;
}
.bg{
 width: 100%;   
 height: 620px;
padding-top: 50px;
}
.auction {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1400px;
  margin: 0 auto;
  height: 500px;

  .box-img {
    width: 500px;
    height: 500px;
  }
  .content {
    position: relative;
    flex: 1;
    height: 100%;
    margin-left: 30px;
    .title {
      font-size: 40px;
      font-family: Atami;
      font-weight: 400;
      color: #ffffff;
    }
    .desc {
      font-size: 18px;
      font-family: Ubuntu;
      font-weight: 400;
      color: #ffffff;
      margin-top: 30px;
      letter-spacing: normal;
    }
    .content-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-right: 160px;
      margin-top: 40px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        div:nth-child(1) {
          font-size: 16px;
          font-family: Ubuntu;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.5;
        }
        div:nth-child(2) {
          font-size: 26px;
          font-family: Ubuntu;
          font-weight: 600;
          color: #ffffff;
          margin-top: 6px;
        }
      }
    }
    .price {
      font-size: 40px;
      font-family: Ubuntu;
      font-weight: 600;
      color: #ff9000;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    .btn {
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 160px;
      height: 40px;
      border-radius: 4px;
      background-color: #ff9000;
      font-size: 20px;
      font-family: Ubuntu-Bold, Ubuntu;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
/deep/.el-input-number__increase::before {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  content: " ";
  width: 2px;
  height: 46px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 46%,
    rgba(128, 128, 128, 0) 100%
  );
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
/deep/.el-input-number__decrease::after {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  content: " ";
  width: 2px;
  height: 46px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 46%,
    rgba(128, 128, 128, 0) 100%
  );
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.bottom{
    width: 100%;
    height: 402px;
    background-color: #000;
    padding-top: 40px;
    .row {
  width: 920px;
  height: 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  .row-left {
    width: 260px;
    height: 12px;
    background: url("../../../static/image/row-left.png");
    background-size: 100% 100%;
  }
  .row-title {
      width: 294px;
    height: 32px;
  }
  .row-right {
    width: 260px;
    height: 12px;
    background: url("../../../static/image/row-right.png");
    background-size: 100% 100%;
  }
}
.land {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1400px;
  margin: 0 auto;
  margin-top: 30px;
  img {
    width: 260px;
    height: 260px;
  }
}
}
</style>
