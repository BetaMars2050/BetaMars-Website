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


    <div class="quest-content">
      <div class="top">
        <div class="top-line"></div>
        <div class="top-text">
          Invite Quest
        </div>

      </div>
      <div class="content-left">
        <div class="quest-ticket1"></div>
        <div class="quest-ticket2"></div>
        <div class="quest-ticket3"></div>

        <div class="quest-claim-btn">Text text</div>
        <div class="quest-ticket-bg"></div>

      </div>


    </div>
    <div class="content-right">

      <div class="content-right-title">Complete the Sailor’s Quest to unlock the invite quest</div>
      <div class="table">
        <div class="table-left">
          <div>Leaderboard</div>
          <div></div>

        </div>
        <div class="table-content">
          <div class="table-header">
            <div>#</div>
            <div>Address</div>
            <div>Invite Users</div>
          </div>

          <div class="list">

            <div class="table-item" v-for="(item, index) in 100" :key="index">
              <div :style="index < 3 ? 'color:#FF9000;' : ''">{{ index + 1 }}</div>
              <div>
                <img src="" alt=""> 0x09f2...8f5bef
              </div>
              <div>1000</div>

            </div>
          </div>

        </div>


      </div>


    </div>


  </div>
</template>


<style lang="scss" scoped>
.quest {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1400px;
  margin: 0 auto;
  margin-top: 160px;
  margin-bottom: 20px;

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
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;


    .content-left {
      position: relative;
      width: 500px;
      height: 610px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 75px;
      margin-left: 164px;

      .quest-ticket1 {
        position: absolute;
        top: 81px;
        left: calc(50% - 210px);
        transform: translate(-50%, 0);

        width: 238px;
        height: 380px;
        background: #fff;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        filter: blur(10px);
        z-index: 2;
      }

      .quest-ticket2 {
        position: absolute;
        top: 38px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 294px;
        height: 468px;
        background: #FFFFFF;
        box-shadow: 0px 0px 26px 0px rgba(255, 144, 0, 0.8);
        z-index: 3;
      }

      .quest-ticket3 {
        position: absolute;
        top: 81px;
        left: calc(50% + 210px);
        transform: translate(-50%, 0);

        width: 238px;
        height: 380px;
        background: #FFFFFF;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        filter: blur(10px);
        z-index: 2;
      }

      .quest-ticket-bg {
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 500px;
        height: 610px;
        background: url('../../../static/image/invite-bg.png');
        background-size: 100% 100%;
        z-index: 1;
      }

      .quest-claim-btn {

        position: absolute;
        bottom: 38px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 208px;
        height: 36px;
        background: #FF9000;
        border-radius: 4px 4px 4px 4px;
        font-size: 22px;
        font-family: Ubuntu, Ubuntu;
        font-weight: 700;
        color: #FFFFFF;
        line-height: 36px;
        letter-spacing: 3px;
        text-align: center;
        z-index: 2;

      }
    }


  }

  .content-right {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;


    .content-right-title {
      font-size: 18px;
      font-family: Ubuntu, Ubuntu;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 21px;
      letter-spacing: 1px;
      margin-bottom: 45px;
    }

    .table {
      width: 466px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .table-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 25px;
        height: 73vh;

        border-right: 1px solid rgba(255, 255, 255, 0.2);
        padding-top: 57px;

        padding-right: 4px;

        & div:nth-child(1) {
          font-size: 22px;
          font-family: Ubuntu, Ubuntu;
          font-weight: 700;
          color: #FF9000;
          line-height: 25px;
          transform: rotate(-90deg);
        }

        & div:nth-child(2) {
          width: 6px;
          height: 234px;
          background: url('../../../static/image/invite-line.png');
          background-size: 100% 100%;
          margin-top: 70px;
          margin-left: 4px;
        }
      }


      .table-content {
        flex: 1;
        height: 73vh;

        margin-left: 25px;

        .table-header {

          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          font-family: Ubuntu, Ubuntu;
          font-weight: 400;
          color: #FFFFFF;
          text-align: left;
          margin-bottom: 8px;

          & div:nth-child(1) {
            width: 80px;
          }

          & div:nth-child(2) {
            width: 210px;
          }

          & div:nth-child(3) {
            width: 125px;
            text-align: right;
          }

        }

        .table-item:last-child {
          margin-bottom: 0px;
        }

        .list {
          width: 100%;
          height: calc(100% - 25px);
          overflow-y: scroll;
        }

        .table-item {

          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          font-family: Ubuntu, Ubuntu;
          font-weight: 400;
          color: #FFFFFF;
          text-align: left;
          margin-bottom: 16px;

          & div:nth-child(1) {
            width: 80px;
          }

          & div:nth-child(2) {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 210px;
            font-size: 16px;
            font-family: Ubuntu, Ubuntu;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.5);

            img {
              width: 20px;
              height: 20px;
              border: 1px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              margin-right: 8px;
            }
          }

          & div:nth-child(3) {
            width: 125px;
            text-align: right;
            color: #FF9000;
          }

        }

      }
    }


  }





}

::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}
</style>
