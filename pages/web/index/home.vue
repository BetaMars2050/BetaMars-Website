<template>
  <div class="home">
    <div class="home-section1">
      <div class="list">
        <a v-for="item in shareList" :href="item.shareUrl" target="_blank" :key="item.id">
          <img :src="item.imgUrl" alt="" /></a>
      </div>

      <div class="home-section1-title"></div>
      <div class="home-section1-text">
        BetaMars is a free and open metaverse world. Play, earn, socialize and
        create by yourself.
      </div>
      <div class="home-section1-info">
        <div class="left">
          <div class="title">Invite Friends to BetaMars Community, Win Land NFT Airdrops

          </div>
          <div class="line"></div>
          <div class="text text2">
            People who invite friends to join the BetaMars Discord server during the period from May 17 to May 24 will
            have the opportunity to win Land NFT airdrops. The highest reward is a 4*8 Land NFT!

          </div>
          <a href="https://discord.gg/g4w4uwwrh4" target="_blank" class="link">Get Now</a>
          <!-- <a
            href="https://www.galler.io/en/launchpad/BetaMars-Ticket-NFT-mystery-box"
            target="_blank"
            class="link"
            >Ticket NFT myestery box</a
          > -->
        </div>
        <div class="right">
          <div class="title">Participate in BetaMars Closed Beta Test to Compete for 200,000 EP
          </div>
          <div class="line"></div>
          <div class="text">
            Counted by the average daily revenue of Land NFTs, top 3 testers will share the 200,000 EP prize pool after
            the test ends (test period: May 20-May 30).

          </div>
          <a href="javascript:;" @click="tip" class="link">Join Now</a>
        </div>
      </div>
    </div>
    <div class="home-section2">
      <HomeSwiper />
    </div>
    <div class="home-section3">
      <div class="mechanism-left">
        <img src="../../../static/image/burning-mechanism.png" class="logo" />
        <div class="title">Burning mechanism</div>
        <div class="text">
          Burning mechanism is the unique deflation system in BetaMars world. It
          is also a great benefit which is endowed with Lords, the owner of the
          Land NFT. By burning Revo, the BetaMars 1.0 circulating token, Lords
          can earn EP dividends from the Tax Pool, where the burnt Revo will be
          destroyed.
        </div>
        <div class="btn">BURN</div>
      </div>
      <div class="mechanism-center">
        <img src="../../../static/image/staking-mechanism.png" class="logo" />
        <div class="title">Staking mechanism</div>
        <div class="text">
          Staking mechanism decides the BetaMars development. It is a special
          right given to every player. By staking Revo, players can trigger the
          hash collision. The Great Revolution will be tridggered once the hash
          collision is success. Meanwhile, players who stake Revo will earn the
          rewards from the BetaMars world.
        </div>
        <div class="btn">STAKE</div>
      </div>
      <div class="mechanism-right">
        <img src="../../../static/image/revolution-mechanism.png" class="logo" />

        <div class="title">Revolution mechanism</div>
        <div class="text">
          Revolution is the core mechanism in BetaMars. Every single resident in
          BetaMars can change the world's class system to rebuild the world
          through revolution.
        </div>
      </div>
    </div>
    <div class="home-section4">
      <div class="home-ep"></div>
      <!-- <div class="home-row">
        <a
          class="home-row-item item-bg1"
          href="https://betamars2050.gitbook.io/betamars-test-tutorial/"
          target="_blank"
        >
          <div class="home-row-item-header">
            <img
              src="../../../static/image/home-test-tutorial-icon.png"
              class="home-row-item-icon"
              alt=""
            />
          </div>

          <div class="home-row-item-footer">TEST TUTORIAL</div>
        </a>

        <a
          class="home-row-item item-bg2"
          href="https://betamars2050.gitbook.io/latest-updates/"
          target="_blank"
        >
          <div class="home-row-item-header">
            <img
              src="../../../static/image/home-latest-updates-icon.png"
              class="home-row-item-icon"
              alt=""
            />
          </div>
          <div class="home-row-item-footer">LATEST UPDATES</div>
        </a>

        <a
          class="home-row-item item-bg3"
          href="https://betamars2050.gitbook.io/help-center/"
          target="_blank"
        >
          <div class="home-row-item-header">
            <img
              src="../../../static/image/home-help-center-icon.png"
              class="home-row-item-icon"
              alt=""
            />
          </div>

          <div class="home-row-item-footer">HELP CENTER</div>
        </a>
      </div> -->
    </div>
    <div class="home-section5">
      <div class="investors">
        <div class="investors-title"></div>
        <div class="investors-list">
          <img src="../../../static/image/investors1.png" alt="" />
          <img src="../../../static/image/investors2.png" alt="" />
          <img src="../../../static/image/investors4.png" alt="" />
          <img src="../../../static/image/investors5.png" alt="" />
          <img src="../../../static/image/investors6.png" alt="" />
        </div>
      </div>
      <div class="partners">
        <div class="partners-title"></div>
        <div class="partners-list">
          <img :src="require('../../../static/image/partners' + item + '.png')" alt="" v-for="(item) in 38"
            :key="item" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  scrollToTop: true,

  name: "",
  data() {
    return {
      shareList: [
        {
          id: 1,
          imgUrl: require("../../../static/image/icon_Twitter.png"),
          shareUrl: "https://twitter.com/Betamars2025",
        },
        {
          id: 2,
          imgUrl: require("../../../static/image/icon_Telegram.png"),
          shareUrl: "https://t.me/betamars",
        },
        {
          id: 3,
          imgUrl: require("../../../static/image/icon_discord.png"),
          shareUrl: "https://discord.gg/g4w4uwwrh4",
        },
        {
          id: 4,
          imgUrl: require("../../../static/image/icon_Facebook.png"),
          shareUrl: "https://www.facebook.com/profile.php?id=100075798009336",
        },
        {
          id: 5,
          imgUrl: require("../../../static/image/icon_medium.png"),
          shareUrl: "https://medium.com/@betamars2050",
        },
        {
          id: 6,
          imgUrl: require("../../../static/image/icon_youtube.png"),
          shareUrl: "https://www.youtube.com/channel/UCklN4kCSmOedOAMiQjoAQrw",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["web3", "account"]),
  },
  methods: {
    tip() {
      this.$message.warning("Coming Soon!");

    }
  },

  created() { },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;

  .home-section1 {
    width: 100%;
    height: 1084px;
    background: url("../../../static/image/home-bg.png");
    background-size: 100% 100%;
    position: relative;

    .home-section1-title {
      position: absolute;
      top: 400px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 673px;
      height: 42px;
      background: url("../../../static/image/welcome-to-BetaMars.png");
      background-size: 100% 100%;
    }

    .home-section1-text {
      position: absolute;
      top: 494px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 534px;
      font-size: 24px;
      font-family: Ubuntu-Regular, Ubuntu;
      font-weight: 400;
      line-height: 43px;
      color: #ffffff;
      letter-spacing: normal;
      text-align: center;
    }

    .list {
      position: absolute;
      top: 130px;
      right: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 385px;

      a {
        display: block;
        width: 30px;
        height: 30px;

        img {
          width: 32px;
          height: 32px;
        }
      }
    }

    .home-section1-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: absolute;
      bottom: 130px;
      left: 204px;
      width: 1250px;
      min-height: 234px;
      background: url("../../../static/image/home-info-bg.png");
      background-size: 100% 100%;
      padding-left: 218px;
      padding-top: 24px;
      padding-bottom: 24px;

      .title {
        width: 100%;
        font-size: 18px;
        font-family: Ubuntu-Regular, Ubuntu;
        font-weight: 400;
        color: #ff9000;
        letter-spacing: normal;

      }

      .line {
        width: 214px;
        height: 10px;
        background: url("../../../static/image/row-right.png");
        background-size: 100% 100%;
        margin-top: 10px;
        margin-bottom: 20px;
      }

      .text {
        width: 400px;

        font-size: 14px;
        font-family: Ubuntu-Regular, Ubuntu;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
        letter-spacing: normal;
        margin-bottom: 10px;
      }

      .text2 {
        width: 440px !important;

      }

      .link {
        display: block;
        font-size: 14px;
        font-family: Ubuntu-Regular, Ubuntu;
        font-weight: 400;
        color: #0066cf;
        line-height: 22px;
        cursor: pointer;
      }

      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 422px;
        height: 100%;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 400px;
        height: 100%;
      }
    }
  }

  .home-section2 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 774px;
    background-color: #0c0d0e;
  }

  .home-section3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 650px;
    padding: 0 260px;
    background: url("../../../static/image/home-mechanism-bg.png");
    background-size: 100% 100%;

    .logo {
      width: 114px;
      height: 114px;
      border-radius: 50%;
      margin-top: 44px;
    }

    .title {
      font-size: 20px;
      font-family: Ubuntu-Bold, Ubuntu;
      font-weight: bold;
      color: #ffffff;
      margin-top: 37px;
      margin-bottom: 16px;
    }

    .text {
      width: 354px;
      font-size: 16px;
      font-family: Ubuntu-Regular, Ubuntu;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 22px;
      letter-spacing: normal;
      opacity: 0.5;
      margin-bottom: 20px;
    }


    .btn {
      width: 136px;
      height: 32px;
      border-radius: 4px;
      background-color: #a7a7a7;

      line-height: 32px;
      text-align: center;
      font-size: 18px;
      font-family: Ubuntu-Bold, Ubuntu;
      font-weight: bold;
      color: #ffffff;
      // cursor: pointer;
    }

    .mechanism-left,
    .mechanism-center,
    .mechanism-right {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    .mechanism-left,
    .mechanism-right {
      width: 422px;
      height: 472px;
      background: url("../../../static/image/mechanism-bg1.png");
      background-size: 100% 100%;

      .text {
        font-size: 14px;
      }
    }

    .mechanism-center {
      width: 450px;
      height: 530px;
      background: url("../../../static/image/mechanism-bg2.png");
      background-size: 100% 100%;

      .logo {
        margin-top: 60px;
      }
    }
  }

  .home-section4 {
    width: 100%;
    background-color: #0c0d0e;

    .home-ep {
      width: 1406px;
      height: 400px;
      background: url("../../../static/image/ep-charts-p.png");
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 100px;
    }

    .home-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1455px;
      margin: 0 auto;
      margin-top: 100px;

      .home-row-item:hover {
        background-size: 110% 110% !important;
      }

      .home-row-item {
        display: flex;
        flex-direction: column;
        align-items: space-between;
        justify-content: center;
        width: 466px;
        height: 346px;
        cursor: pointer;
        transition: all 0.4s;
        border: 2px solid rgba(255, 255, 255, 0.7);

        .home-row-item-header {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 292px;

          .home-row-item-icon {
            width: 88px;
            height: 88px;
          }
        }

        .home-row-item-footer {
          width: 100%;
          height: 55px;
          background: rgba(125, 62, 11, 0.8);
          font-size: 24px;
          font-family: Atami;
          font-weight: 400;
          color: #fbd267;
          text-align: center;
          line-height: 55px;
        }
      }

      .item-bg1 {
        background: url("../../../static/image/home-test-tutorial-bg.png") center;
        background-size: 100% 100%;
      }

      .item-bg2 {
        background: url("../../../static/image/home-latest-updates-bg.png") center;
        background-size: 100% 100%;
      }

      .item-bg3 {
        background: url("../../../static/image/home-help-center-bg.png") center;
        background-size: 100% 100%;
      }
    }
  }

  .home-section5 {
    padding-top: 30px;

    .investors {
      width: 1460px;
      margin: 0 auto;

      .investors-title {
        width: 232px;
        height: 32px;
        margin: 0 auto;
        background: url("../../../static/image/investors-title.png");
        background-size: 100% 100%;
        margin-top: 70px;
        margin-bottom: 40px;
      }

      .investors-list {
        display: flex;
        justify-content: center;
        align-items: space-between;
        flex-wrap: wrap;
        height: 130px;

        img {
          width: 120px;
          height: 120px;
          margin-right: 204px;
        }

        img:nth-child(5),
        img:last-child {
          margin-right: 0px !important;
        }
      }
    }

    .partners {
      width: 1460px;
      height: auto;
      margin: 0 auto;

      .partners-title {
        width: 232px;
        height: 32px;
        margin: 0 auto;
        background: url("../../../static/image/partners-title.png");
        background-size: 100% 100%;
        margin-top: 70px;
        margin-bottom: 40px;
      }

      .partners-list {
        display: flex;
        justify-content: center;
        align-items: space-between;
        flex-wrap: wrap;
        height: auto;


        img {
          width: 120px;
          height: 120px;
          margin-right: 204px;
          margin-bottom: 60px;

        }


        img:nth-child(5),
        img:nth-child(10),
        img:nth-child(15),
        img:nth-child(20),
        img:nth-child(25),
        img:nth-child(30),
        img:nth-child(35),
        img:last-child {
          margin-right: 0px !important;
        }
      }
    }
  }
}
</style>
