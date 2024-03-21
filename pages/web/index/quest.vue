<script>
export default {
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {

  }
}


</script>

<template>
  <div class="quest">
    <div class="top">
      <div class="top-line"></div>
      <div class="top-text">

        Sailor's Quest
      </div>

    </div>

    <div class="quest-content">
      <div class="content-left">
        <div class="quest-ticket"></div>
        <div class="quest-claim-btn">Claim</div>
        <div class="quest-ticket-bg"></div>

      </div>
      <div class="content-right">

        <div class="content-right-bg"></div>
        <div class="quest-item">
          <img src="../../../static/image/quest-arrow.png" alt="">
          Get your wallet ready for the gold
          <div class="connect-btn">
            Connect Now
          </div>
        </div>


        <div class="quest-item">
          <img src="../../../static/image/quest-arrow.png" alt="">
          Connect your Discord
          <!-- <div class="connect-btn">
            Connect Now
          </div> -->
        </div>



        <div class="quest-item">
          <img src="../../../static/image/quest-arrow.png" alt="">
          Join our expedition discord, and acquire the role: Voyager.
          <!-- <div class="connect-btn">
            Connect Now
          </div> -->
        </div>



        <div class="quest-item">
          <span></span>
          Connect your Twitter
          <!-- <div class="connect-btn">
            Connect Now
          </div> -->
        </div>


        <div class="quest-item">
          <span></span>

          Follow BETAMARS
          <!-- <div class="connect-btn">
            Connect Now
          </div> -->
        </div>


        <div class="quest-item">
          <span></span>
          Broadcast your journey to your mate
          <!-- <div class="connect-btn">
            Connect Now
          </div> -->
        </div>



        <div class="all-participants">
          <div class="all-participants-title">All Participants</div>
          <div class="all-participants-list">
            <img src="" alt="" v-for="(item, index) in 10 " :key="index"
              :style="`position:absolute;z-index:${index * -1 + 10};`">
            (+1000)
          </div>


        </div>

      </div>

    </div>


    <div class="bottom">

    </div>
  </div>
</template>


<style lang="scss" scoped>
.quest {
  width: 1400px;
  margin: 0 auto;
  margin-top: 160px;
  margin-bottom: 160px;

  * {
    letter-spacing: 1px !important;
  }

  .top {
    .top-line {
      width: 802px;
      height: 12px;
      background: url('../../../static/image/quest-title-line.png');
      background-size: 100% 100%;
    }

    .top-text {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 340px;
      height: 70px;
      font-size: 36px;
      font-family: Ubuntu, Ubuntu;
      font-weight: 700;
      color: #FFFFFF;
      background: url('../../../static/image/quest-title-bg.png');
      background-size: 100% 100%;

    }
  }





  .quest-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 110px;
    padding: 0 0px 0 170px;

    .content-left {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #000;
      margin-right: 60px;

      .quest-ticket {
        width: 264px;
        height: 420px;
        background: #FFFFFF;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        z-index: 2;

      }

      .quest-ticket-bg {
        position: absolute;
        top: 95px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 380px;
        height: 446px;
        background: url('../../../static/image/quest-ticket-bg.png');
        background-size: 100% 100%;
        z-index: 1;
      }

      .quest-claim-btn {
        width: 156px;
        height: 36px;
        background: #333333;
        border-radius: 4px 4px 4px 4px;
        font-size: 22px;
        font-family: Ubuntu, Ubuntu;
        font-weight: 700;
        color: #666666;
        line-height: 36px;
        letter-spacing: 3px;
        text-align: center;
        z-index: 2;
        margin-top: 20px;

      }
    }

    .content-right {
      position: relative;
      min-width: 740px;

      .content-right-bg {
        position: absolute;
        top: 50%;
        left: 100px;
        transform: translate(0%, -50%);
        width: 368px;
        height: 368px;
        background: url('../../../static/image/quest-right-bg.png');
        background-size: 100% 100%;
        z-index: 1;
      }

      .quest-item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 40px;
        font-size: 18px;
        font-family: Ubuntu, Ubuntu;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 21px;
        margin-bottom: 32px;
        z-index: 2;

        img {
          width: 46px;
          height: 36px;
          margin-right: 6px;
        }

        span {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          margin-left: 30px;
          margin-right: 14px;
        }

        .connect-btn {
          width: auto;
          height: 40px;
          background: rgba(0, 0, 0, 0);
          border-radius: 218px 218px 218px 218px;
          opacity: 1;
          border: 1px solid #FF9000;
          font-size: 22px;
          font-family: Ubuntu, Ubuntu;
          font-weight: 700;
          color: #FF9000;
          line-height: 40px;
          text-align: center;
          padding: 0 36px;
          cursor: pointer;
          margin-left: 20px;
        }
      }

      .all-participants {
        position: relative;
        margin-left: 50px;
        z-index: 2;

        .all-participants-title {
          font-size: 18px;
          font-family: Ubuntu, Ubuntu;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 21px;
        }

        .all-participants-list {
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 18px;
          font-family: Ubuntu, Ubuntu;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          line-height: 21px;
          margin-top: 20px;
          padding-left: 234px;

          img:nth-child(1) {
            left: 0px;
          }

          img:nth-child(2) {
            left: 20px;
          }

          img:nth-child(3) {
            left: 40px;
          }

          img:nth-child(4) {
            left: 60px;
          }

          img:nth-child(5) {
            left: 80px;
          }

          img:nth-child(6) {
            left: 100px;
          }

          img:nth-child(7) {
            left: 120px;
          }

          img:nth-child(8) {
            left: 140px;
          }

          img:nth-child(9) {
            left: 160px;
          }

          img:nth-child(10) {
            left: 180px;
          }

          img {
            width: 32px;
            height: 32px;
            opacity: 1;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }





  .bottom {
    width: 802px;
    height: 12px;
    margin-left: auto;
    background: url('../../../static/image/quest-bottom-line.png');
    background-size: 100% 100%;
  }




}
</style>
