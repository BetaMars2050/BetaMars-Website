// <template>
  <div class="personal-menu">
    <div
      class="menu-item"
      :class="currentId === item.id ? 'menu-current-item' : ''"
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
  name: "BetamarsPersonalmenu",
  data() {
    return {
      currentId: 1,
      menuList: [
        { id: 1, name: "asset", url: "/web/myaccount/asset/" },
        { id: 2, name: "nft", url: "/web/myaccount/myNFTs/" },
        { id: 3, name: "history", url: "/web/myaccount/history/" },
      ],
    };
  },

  mounted() {},
  watch: {
    $route: {
      handler: function (val, olVal) {
        this.changeCurrentId();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    changeCurrentId() {
      this.menuList.map((v) => {
        if (v.url.indexOf(this.$route.fullPath.substring(14, 21)) !== -1) {
          this.currentId = v.id;
          
        }
      });
    },
    handleClick(i) {
      this.currentId = i.id;
      this.$router.push({ path: i.url });
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-menu {
  position: relative;
  width: 100%;
  height: 100%;
  .menu-item {
    position: relative;
    width: 100%;
    height: 100px;
    font-size: 26px;
    font-family: "BankGothic";
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 100px;
    z-index: 2;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.5s;
    background: url("../static/image/menu-item-check-.png") no-repeat;
    background-size: 0% 100%;
  }

  .menu-item::after {
    // content: " ";
    // display: block;
    // width: 100%;
    // height: 1px;
    // background: linear-gradient(90deg, rgba(247, 110, 35, 0.28));
  }
  .menu-current-item {
    color: #f76e23 !important;

    background-size: 100% 100% !important;
  }
}
</style>