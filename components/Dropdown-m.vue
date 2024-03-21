<template>
  <div class="dropdown">
    <div class="dropdown-header" @click="toggleDropdownStatus">
      <div class="dropdown-text">{{ dropdownList[current].name }}</div>
      <img
        src="../static/image/nfts-search-icon.png"
        class="dropdown-icon"
        alt=""
      />
    </div>

    <div
      class="dropdown-container"
      :class="show ? 'dropdown-container-show' : ''"
    >
      <div
        class="dropdown-item"
        v-for="(item, index) in dropdownList"
        :key="index"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsDropdownm",
  data() {
    return {
      current: 0,
      dropdownList: [
        { id: 0, name: "Address" },
        { id: 1, name: "NFT ID" },
      ],
      show: false,
    };
  },

  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) this.show = false;
    });
  },

  methods: {
    toggleDropdownStatus() {
      this.show = !this.show;
    },
    selectItem(i) {
      this.$emit("toggleCurrentDropdownItem", i);
      this.current = i.id;
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  width: 216px;
  height: 100%;
  border-right: 1px solid #f76e23;
  background: rgba(20, 14, 19, 0.95);

  padding: 0 20px;
  position: relative;
  z-index: 9;

  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 22px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #5b5552;
    letter-spacing: 3px;
    cursor: pointer;
    .dropdown-icon {
      width: 15px;
      height: 8px;
    }
  }
  .dropdown-container {
    position: absolute;
    left: -1px;
    top: 69px;
    width: 216px;
    opacity: 0;
    height: 0;
    background: rgba(20, 14, 19, 0.95);
    transition: all 0.4s;
    height: auto;
    min-height: 60px;
    border: 1px solid #f76e23;
    z-index: -1;
    border-top: none;
    .dropdown-item:hover {
      color: #fff;
    }
    .dropdown-item {
      width: 100%;
      height: 60px;
      font-size: 22px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #5b5552;
      letter-spacing: 3px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
      z-index: 9;
    }
  }
}
.dropdown-container-show {
  z-index: 999 !important;
  opacity: 1 !important;
}
</style>