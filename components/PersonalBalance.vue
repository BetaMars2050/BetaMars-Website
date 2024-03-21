<template>
  <div class="balance">
    <div class="my-address">
      <div class="address">
        {{
          account
            ? account.substring(0, 6) +
              "..." +
              account.substring(account.length - 6, account.length)
            : "------"
        }}
      </div>
      <img src="../static/image/copy-icon.png" alt="" />
    </div>
    <div class="my-balance">
      <div class="token">
        <div class="token-top">
          <img src="../static/image/test-avatar.png" alt="" />
          <div class="content">
            <div class="amount">23000.00</div>
            <div class="title">Elonpunk</div>
          </div>
        </div>
        <div class="token-bottom">
          <div class="token-btn">Top up</div>
          <div class="token-btn">Withdraw</div>
        </div>
      </div>
      <div class="token">
        <div class="token-top">
          <img src="../static/image/test-avatar.png" alt="" />
          <div class="content">
            <div class="amount">23000.00</div>
            <div class="title">Revo</div>
          </div>
        </div>
        <div class="token-bottom">
          <div class="token-btn">Top up</div>
          <div class="token-btn">Withdraw</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BetamarsPersonalbalance",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["account"]),
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.balance {
  width: 100%;
  height: 100%;
  padding: 80px 50px;
  .my-address {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .address {
      font-size: 35px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
    }
    img {
      width: 20px;
      height: 23px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .my-balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    .token {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .token-top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 86px;
          height: 86px;
          border-radius: 50%;
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          margin-left: 22px;
          .amount {
            font-size: 35px;
            font-family: BankGothic;
            font-weight: 400;
            color: #f76e23;
          }
          .title {
            font-size: 19px;
            font-family: BankGothic;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 10px;
          }
        }
      }
      .token-bottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 35px;
        .token-btn:first-child {
          margin-right: 10px;
        }

        .token-btn {
          width: 210px;
          height: 80px;
          background: url("../static/image/my-balance-btn.png");
          background-size: 100% 100%;
          font-size: 22px;
          font-family: "BankGothic";
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 80px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>