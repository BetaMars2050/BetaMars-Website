<template>
  <div class="countdown">
    <div class="countdown-title">countdown</div>
    <div class="countdown-time">
      <div class="countdown-top">
        <div>{{ day }}</div>
        <div>{{ hr }}</div>
        :
        <div>{{ min }}</div>
        :
        <div>{{ sec }}</div>
      </div>
      <div class="countdown-bottom">
        <div>Days</div>
        <div>Hrs</div>
        <div>Mins</div>
        <div>Secs</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "BetamarsCountdown",

  data() {
    return {
      endTime: "2022-02-01 00:00:00",
      day: "",
      hr: "",
      min: "",
      sec: "",
    };
  },

  mounted() {
    this.countdown();
  },

  methods: {
    countdown() {
      const end = moment(this.endTime).valueOf();
      const now = moment().valueOf();
      if (now >= end) {
        this.day = "00";
        this.hr = "00";
        this.min = "00";
        this.sec = "00";
        return;
      }
      const msec = end - now;
      let day = parseInt(msec / 1000 / 60 / 60 / 24);
      let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      this.day = day > 9 ? day : "0" + day;
      this.hr = hr > 9 ? hr : "0" + hr;
      this.min = min > 9 ? min : "0" + min;
      this.sec = sec > 9 ? sec : "0" + sec;
      const that = this;
      setTimeout(function () {
        that.countdown();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.countdown {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .countdown-title {
    font-size: 18px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #f76e23;
  }
  .countdown-time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .countdown-top :nth-child(2) {
      margin-left: 10px;
    }
    .countdown-top {
      width: 290px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      font-size: 32px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      letter-spacing: 0px;
      div {
        transition: all 0.1s;
      }
    }
    .countdown-bottom {
      width: 310px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      font-family: NeutraliserSans Regular;
      font-weight: 400;
      color: rgba($color: #fff, $alpha: 0.6);
    }
  }
}
</style>