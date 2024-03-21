<template>
  <div
    :class="['vue-countdown-component', { theme2: theme !== 1 }, { ie: isIE }]"
  >
    <template v-for="(item, index) in timeArray">
      <div :class="['time-box']" :key="index">
        <div class="base">
          {{ item }}
          <div class="base-b">{{ timeArrayT[index] }}</div>
        </div>
        <div
          :class="['face', { anime: isAnimate[index] }]"
          @animationend="onAnimateEnd(index)"
        >
          {{ timeArrayT[index] }}
        </div>
        <div :class="['back', { anime: isAnimate[index] }]">{{ item }}</div>
      </div>
      <div
        class="time-unit"
        :key="`unit-${index}`"
        v-if="isTimeUnitShow(index)"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIE: false,
      timeArray:
        this.theme === 2
          ? new Array(this.type * 2).fill("0")
          : new Array(this.type).fill("00"),
      timeArrayT:
        this.theme === 2
          ? new Array(this.type * 2).fill("0")
          : new Array(this.type).fill("00"),
      isAnimate:
        this.theme === 2
          ? new Array(this.type * 2).fill(false)
          : new Array(this.type).fill(false),
    };
  },
  props: {
    endDate: { type: [Date, Number, String], default: 0 },
    type: { type: [Number, String], default: 4 },
    theme: { type: [Number, String], default: 1 },
    timeUnit: { type: Array, default: () => [] },
  },
  computed: {
    endTime() {
      if (this.endDate instanceof Date) {
        return this.endDate.getTime();
      }
      return Number(this.endDate) > 0 ? Number(this.endDate) : 0;
    },
    step() {
      return this.theme === 1 ? 1 : 2;
    },
    arr() {
      const length = this.timeArray.length;
      const step = this.step;
      const temp = [
        length - 1,
        length - step - 1,
        length - step * 2 - 1,
        length - step * 3 - 1,
      ];
      temp.length = this.type > 1 ? this.type : 1;
      return temp;
    },
  },
  watch: {
    timeArray(newV, oldV) {
      const diff = [];
      newV.forEach((value, index) => {
        if (value !== oldV[index]) {
          diff.push({ value, index });
          this.$set(this.isAnimate, index, true);
        }
      });
      setTimeout(() => {
        diff.forEach((item) => {
          this.$set(this.timeArrayT, item.index, item.value);
        });
      }, 350);
    },
    endTime(newV) {
      if (newV > 0) {
        this.start();
      }
    },
  },
  mounted() {
    if (
      window.ActiveXObject ||
      "ActiveXObject" in window ||
      window.navigator.userAgent.indexOf("Edge") > -1
    ) {
      this.isIE = true;
    }
    this.start(0);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    start(step = 1000) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let t = this.endTime - new Date().getTime();
        t = t < 0 ? 0 : t;
        let day = 0;
        let hour = 0;
        let min = 0;
        let second = 0;
        const type = Number(this.type);
        if (type >= 4) {
          day = Math.floor(t / 86400000);
          hour = Math.floor(t / 3600000 - day * 24);
          min = Math.floor(t / 60000 - day * 1440 - hour * 60);
          second = Math.floor(t / 1000 - day * 86400 - hour * 3600 - min * 60);
        } else if (type >= 3) {
          hour = Math.floor(t / 3600000);
          min = Math.floor(t / 60000 - hour * 60);
          second = Math.floor(t / 1000 - hour * 3600 - min * 60);
        } else if (type >= 2) {
          min = Math.floor(t / 60000);
          second = Math.floor(t / 1000 - min * 60);
        } else {
          second = Math.floor(t / 1000);
        }
        let arr = [];
        if (Number(this.theme) === 1) {
          type >= 4 && arr.push(String(day).padStart(2, "0"));
          type >= 3 && arr.push(String(hour).padStart(2, "0"));
          type >= 2 && arr.push(String(min).padStart(2, "0"));
          arr.push(String(second).padStart(2, "0"));
        } else {
          type >= 4 && arr.push(...String(day).padStart(2, "0").split(""));
          type >= 3 && arr.push(...String(hour).padStart(2, "0").split(""));
          type >= 2 && arr.push(...String(min).padStart(2, "0").split(""));
          arr.push(...String(second).padStart(2, "0").split(""));
        }
        this.timeArray = arr;
        if (t > 0) {
          this.start();
        } else {
          this.$emit("timeUp");
        }
      }, step);
    },

    onAnimateEnd(index) {
      this.$set(this.isAnimate, index, false);
    },
    isTimeUnitShow(index) {
      if (this.arr.includes(index)) {
        if (index === this.timeArray.length - 1 && !this.timeUnit[3]) {
          return false;
        }
        return true;
      }
      return false;
    },
    setTimeUnit(index) {
      switch (index) {
        case this.timeArray.length - 1:
          return this.timeUnit[3] || "";
        case this.timeArray.length - this.step - 1:
          return this.timeUnit[2] || "";
        case this.timeArray.length - this.step * 2 - 1:
          return this.timeUnit[1] || "";
        default:
          return this.timeUnit[0] || "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.vue-countdown-component {
  display: flex;
  align-items: center;
  @keyframes animate-filp-face {
    0% {
      transform: rotateX(-0.01deg);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    51% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: rotateX(-180deg);
    }
  }
  @keyframes animate-filp-back {
    0% {
      transform: rotateX(180deg);
    }
    100% {
      transform: rotateX(-0.01deg);
    }
  }
  &.ie {
    .base {
      .base-b {
        clip: rect(15px, auto, auto, auto);
      }
    }
    .face {
      clip: rect(auto, auto, 15px, auto);
    }
    .back {
      clip: rect(15px, auto, auto, auto);
    }
  }
  &.theme2 {
    .time-box {
      width: 72px;
      & + .time-box {
        margin-left: 10px;
      }
    }
  }
  .time-unit {
    height: 60px;
    width: 16px;
    background: url("../static/image/flip-countdown-circle.png");
    background-size: 100% 100%;
    margin: 0 10px;
  }
  .time-box {
    position: relative;
    box-sizing: border-box;
    height: 112px;
    width: 72px;
    font-size: 98px;
    font-family: "Chosence";
    font-weight: bold;
    color: rgba(244, 156, 99, 0.7);
    text-align: center;
    border-radius: 4px;
    background: url("../static/image/flip-countdown-bg.png");
    background-size: 100% 100%;
    perspective: 144px;
    line-height: 112px;
    &:before {
      content: "";
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 1px;
      top: 50%;
      left: 0px;
      z-index: 2;
    }

    & + .time-box {
      margin-left: 8px;
    }
    & > div {
      overflow: hidden;
      animation-timing-function: linear;
      animation-duration: 400ms;
      transform: rotateX(-0.01deg);
      border-radius: 4px;
      &.base {
        position: relative;
        .base-b {
          position: absolute;
          left: 0;
          bottom: 0;
          border-radius: 0 0 4px 4px;
          width: 100%;
          height: 100%;
          background: url("../static/image/flip-countdown-bg.png");
          background-size: 100% 100%;
          clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
        }
      }
      &.face {
        position: absolute;
        left: 0;
        top: 0px;
        width: 100%;
        height: 100%;
        background: url("../static/image/flip-countdown-bg.png") top;
        background-size: 100% 100%;
        backface-visibility: visible;
        clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        border-radius: 4px 4px 0 0;

        z-index: 2;
        &.anime {
          animation-name: animate-filp-face;
        }
      }
      &.back {
        position: absolute;
        left: 0;
        top: 0px;
        width: 100%;
        height: 100%;
        background: url("../static/image/flip-countdown-bg.png") bottom;
        background-size: 100% 100%;
        transform: rotateX(-180deg);
        backface-visibility: visible;
        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
        border-radius: 0 0 4px 4px;

        &.anime {
          animation-name: animate-filp-back;
        }
      }
    }
  }
}
</style>