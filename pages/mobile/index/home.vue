<template>
  <div class="home-container">
    <div class="section1">
      <div class="title">Welcome to betamars</div>
      <div class="desc">The Eve of Future is here</div>
    </div>
    <div class="section2">
      <div class="content">
        <div class="content-title">Game Settings</div>
        <div class="content-line"></div>
        <div class="content-text">
          In Betamars 1.0, the foundation construction stage, human pioneers
          compete for the decision-making rights in the future world by mining
          Elonpunk, which is the voting right as well. Lords, Miners and
          resources together intertwine complex relationships, among which human
          nature is the biggest variable.
        </div>
      </div>
      <img
        class="banner"
        src="../../../static/image/home-banner1-m.png"
        alt=""
      />
    </div>

    <div class="section3">
      <img
        class="banner"
        src="../../../static/image/home-banner2-m.png"
        alt=""
      />
      <div class="content">
        <div class="content-title">Role identities</div>
        <div class="content-line"></div>
        <div class="content-second-title">lord</div>
        <div class="content-text">
          Owning Betamars land NFT to activate the corresponding land and
          identity of Lord. Lord has the right to manage his own land in the
          Betamars world and obtain revenue from the Elonpunk pool produced in
          land.
        </div>
        <div class="content-second-title mt">miner</div>
        <div class="content-text">
          Activated identity of miner by a Betamars ticket NFT. Miners can
          select which land in the Betamars world for mining and dividends.
        </div>
      </div>
    </div>

    <div class="section4">
      <div class="content">
        <div class="content-title">Worldview</div>
        <div class="content-line"></div>
        <div class="content-text">
          Running out of land resources in 2036, human pioneers journeyed to
          Mars by Space Mars to explore and build a fresh homeland. A man named
          “Elonpunk” lead people to create a new civilization. Cooperation,
          gambling, fighting, resisting… happen in the Betamars world.
        </div>
      </div>
      <img
        class="banner"
        src="../../../static/image/home-banner3-m.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsHome",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: auto !important;
  background: url("../../../static/image/home-bg-m.png");
  background-size: 100% 100%;
  padding-bottom: 240px;
  .section1 {
    position: relative;
    width: 100%;
    height: 576px;
    .title {
      position: absolute;
      top: 274px;
      left: 50%;
      width: 80%;
      text-align: center;
      transform: translate(-50%, 0);
      font-size: 30px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ededed;
      letter-spacing: 2px;
    }
    .desc {
      position: absolute;
      top: 316px;
      left: 50%;
      width: 80%;
      text-align: center;
      transform: translate(-50%, 0);
      font-size: 18px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #f76e23;
      letter-spacing: 2px;
    }
  }

  .banner {
    width: 320px;
    height: 364px;
  }
  .section2,
  .section3,
  .section4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section2,
  .section4 {
    padding: 0 36px 0 66px;
  }
  .section3 {
    padding: 0 66px 0 36px;
    margin-top: 40px;
  }
  .section4 {
    margin-top: 40px;
  }
  .content {
    .content-title {
      font-size: 23px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ededed;
      letter-spacing: 2px;
    }
    .mt {
      margin-top: 10px;
    }
    .content-second-title {
      font-size: 15px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #fff;
    }
    .content-line {
      width: 292px;
      height: 5px;
      background: url("../../../static/image/home-swiper-line.png");
      background-size: 100% 100%;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .content-text {
      width: 320px;

      font-size: 13px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ff783d;
    }
  }
}
</style>