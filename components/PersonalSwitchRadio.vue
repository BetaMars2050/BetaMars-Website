<template>
  <div class="switch">
    <div class="switch-radio">
      <div
        class="item"
        :class="current === item.id ? 'check' : ''"
        v-for="item in radioList"
        :key="item.id"
        @click="handelClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsPersonalswitchradio",

  data() {
    return {};
  },
  props: {
    current: {
      type: Number,
      default: 1,
    },
    radioList: {
      type: Array,
    },
  },
  mounted() {},

  methods: {
    handelClick(i) {
      this.$emit("switchRadio", i);
    },
  },
};
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
  .switch-radio {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    height: 62px;
    border-radius: 30px;
    border: 1px solid #563723;
    background-color: rgba($color: #190805, $alpha: 0.5);
    .item {
      width: 180px;
      height: 62px;
      border-radius: 30px;
      font-size: 20px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      line-height: 62px;
      text-align: center;
      opacity: 0.5;
      letter-spacing: 0px !important;
      transition: all 0.5s;
      padding: 0 24px;
    }
    .item2 {
      width: 250px;
      height: 62px;
      border-radius: 30px;
      font-size: 20px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      line-height: 62px;
      text-align: center;
      opacity: 0.5;
      letter-spacing: 0px !important;
      transition: all 0.5s;
      padding: 0 24px;
    }
    .check2 {
      background: url("../static/image/switch-radio2.png");
      background-size: cover;
      opacity: 1 !important;
    }
    .check {
      background: url("../static/image/switch-radio.png");
      background-size: cover;
      opacity: 1 !important;
    }
  }
}
</style>