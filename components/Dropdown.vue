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
  name: "BetamarsDropdown",
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
  width: 206px;
  height: 100%;
  border: 1px solid rgba($color: #f76e23, $alpha: .5);
  padding: 0 24px;
  border-right: none;
  position: relative;
  z-index: 9;

  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #3d3d3f;
    cursor: pointer;
    .dropdown-icon {
      width: 15px;
      height: 8px;
    }
  }
  .dropdown-container {
    position: absolute;
    left: -1px;
    top: 54px;
    width: 207px;
    opacity: 0;
    height: 0;
    // min-height: 0;
    border: 1px solid rgba($color: #f76e23, $alpha: .5);
    transition: all 0.4s;
    border-top: none;
    z-index: 999;
    .dropdown-item:hover {
      color: #fff;
    }
    .dropdown-item {
      width: 100%;
      height: 60px;
      font-size: 14px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #3d3d3f;
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      z-index: 9;
    }
  }
}
.dropdown-container-show {
  height: auto !important;
  min-height: 60px !important;
  opacity: 1 !important;
}
</style>