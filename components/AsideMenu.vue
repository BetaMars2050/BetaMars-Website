<template>
  <div class="aside">
    <div class="aside-line" :class="'aside-line-position' + currentId"></div>

    <div
      class="aside-item"
      :class="[
        currentId === item.id ? 'aside-item-check' : '',
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
  name: "pageHeader",
  data() {
    return {
      currentId: 1,
      menuList: [
        { id: 1, name: "HOME", url: "/web/home/" },
        { id: 2, name: "GAME", url: "" },
        // { id: 3, name: "AIRDROP", url: "/web/airdrop/" },
        { id: 3, name: "Ticket NFT", url: "/web/ticket/" },
        { id: 4, name: "NFT MARKET", url: "" },
        { id: 5, name: "NFT SCAN", url: "/web/NFTSCAN/" },
        {
          id: 6,
          name: "OVERVIEW",
          url: "https://betamars2050.gitbook.io/betamars/",
        },
        {
          id: 7,
          name: "ACTIVITY",
          url: "/web/airdrop/",
        },
      ],
    };
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
    this.changeCurrentId();
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
      } else if (item.id === 6) {
        window.open(item.url, "_blank");
      }
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.opacity {
  opacity: 0.5;
}
.aside {
  position: fixed;
  top: 52%;
  left: 50px;
  transform: translate(0, -50%);
  width: 350px;
  height: 600px;
  background-color: transparent;
  border-left: 1px solid #ededed;
  z-index: 2;
  .aside-item-check {
    color: #f76e23 !important;
  }
  .aside-item {
    height: 86px;
    font-size: 21px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #fff;
    text-shadow: 0px 0px 0px rgba(54, 27, 13, 0.36);
    text-align: left;
    padding-left: 35px;
    line-height: 86px;
    letter-spacing: 2px;
    z-index: 2;
    cursor: pointer;
  }

  .aside-line {
    position: absolute;
    left: -4px;
    width: 8px;
    height: 86px;
    background-color: #f76e23;
    transition: 0.5s all;
  }
  .aside-line-position1 {
    top: 0px;
  }
  .aside-line-position2 {
    top: 86px;
  }
  .aside-line-position3 {
    top: 172px;
  }
  .aside-line-position4 {
    top: 258px;
  }
  .aside-line-position5 {
    top: 344px;
  }
  .aside-line-position6 {
    top: 430px;
  }
   .aside-line-position7 {
    top: 516px;
  }
}
</style>
