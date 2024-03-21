<template>
  <div class="menu" :class="showMenu ? 'show-menu' : ''">
    <div
      class="menut-item"
      :class="[
        currentId === item.id ? 'current-item' : '',
        item.url ? '' : 'opacity',
      ]"
      v-for="item in menuList"
      :key="item.id"
      @click="handleClick(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsAsidemenuM",

  data() {
    return {
      currentId: 1,
      menuList: [
        { id: 1, name: "HOME", url: "/mobile/home/" },
        { id: 2, name: "GAME", url: "" },
        // { id: 3, name: "AIRDROP", url: "/mobile/airdrop/" },
        { id: 3, name: "Ticket NFT", url: "/mobile/ticket/" },

        { id: 4, name: "NFT MARKET", url: "" },
        { id: 5, name: "NFT SCAN", url: "/mobile/NFTSCAN/" },
        {
          id: 6,
          name: "OVERVIEW",
          url: "https://betamars2050.gitbook.io/betamars/",
        },
        {
          id: 7,
          name: "ACTIVITY",
          url: "/mobile/airdrop/",
        },
      ],
    };
  },
  props: {
    showMenu: Boolean,
  },
  watch: {
    $route: {
      handler: function (val, olVal) {
        this.changeCurrentId();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target) && e.target.className !== "menu-img")
        this.$emit("hideMenu");
    });
  },

  methods: {
    changeCurrentId() {
      this.menuList.map((v) => {
        if (v.url.indexOf(this.$route.fullPath) !== -1) {
          this.currentId = v.id;
        }
      });
    },
    handleClick(item) {
      if (item.url && item.id !== 6) {
        this.$router.push({ path: item.url });
        this.currentId = item.id;
        this.$emit("hideMenu");
      } else if (item.id === 6) {
        window.open(item.url, "_blank");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.show-menu {
  top: 80px !important;
  opacity: 1 !important;
  height: 130px !important;
}
.opacity {
  opacity: 0.5;
}

.menu {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  position: fixed;
  top: 60px;
  margin-top: 0px;
  width: 750px;
  background: #140e13;
  transition: all 0.4s;
  z-index: 3;
  height: 0;
  opacity: 0;
  overflow: hidden;
  .menut-item {
    width: 25%;
    font-size: 18px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #ededed;
    text-align: center;
    margin-top: 2px;
  }

  .current-item {
    color: #f76e23 !important;
  }
}
</style>