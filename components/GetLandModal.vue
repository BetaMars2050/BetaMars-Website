<template>
  <div class="modal" :class="isGetLandModalShow ? 'show' : ''">
    <div class="dialog">
      <img src="../static/image/logo.png" class="logo" alt="" />
      <div class="land-id">Bsc nft ID : {{ currentLandInfo._ID }}</div>
      <div class="img-box">
        <el-image :src="currentLandInfo.img" class="land-img">
          <div slot="placeholder" class="image-slot-placeholder">
            <ImageLoading></ImageLoading>
          </div>

          <div slot="error" class="image-slot-error">Loading failed</div>
        </el-image>
      </div>
      <div class="bottom">
        <div class="download" @click="download">Download</div>
        <div class="close" @click="close">Close</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsGetlandModal",

  data() {
    return {};
  },
  props: {
    isGetLandModalShow: Boolean,
    currentLandInfo: Object,
  },

  mounted() {},

  methods: {
    download() {
      console.log(this.$refs);
      const a = document.createElement("a");
      const url = this.currentLandInfo.img;
      if (!url) {
        return this.downloadFail();
      }
      this.$message({
        showClose: true,
        message: "Downloading...",
        type: "warning",
        duration: "3000",
      });
      try {
        a.href = url;
        a.download =
          "BETAMARSTESTTICKETS-" + this.currentLandInfo._ID + ".png";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        this.downloadFail();
        console.log(err, "fetch error");
      }
    },
    downloadFail() {
      this.$message({
        showClose: true,
        message: "Download failed！",
        type: "warning",
        duration: "3000",
      });
    },

    close() {
      this.$emit("hideGetLandModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.show {
  display: inherit !important;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  display: none;
  background-color: rgba(#000, 0.75);

  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 694px;
    height: 631px;
    z-index: 9;
    .bottom {
      display: flex;
      justify-content: space-between;

      align-items: center;
      width: 510px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      .close {
        width: 240px;
        height: 40px;
       
          background-color: #A7A7A7;
        font-size: 24px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
      }
      .download {
          width: 240px;
        height: 40px;
          background-color: #FF9000;
        border-radius: 4px;
        font-size: 24px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
    }
    .land-id {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 500px;
      height: 36px;
      font-size: 26px;
      font-family: "BankGothic";
      font-weight: 400;
      text-align: center;
      line-height: 36px;
      color: #fff;
      background: url("../static/image/airdrop-id-bg.png");
      background-size: 100% 100%;
    }
    .logo {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 320px;
      height: 32px;
    }
    .img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 694px;
      height: 571px;
      background: url("../static/image/land-modal-bg.png");
      background-size: 100% 100%;
      padding-right: 10px;
      .land-img {
        width: 425px;
        height: 425px;
        .image-slot-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
         width: 425px;
        height: 425px;
          font-size: 14px;
          font-family: "BankGothic";
          font-weight: 400;
          color: #ffffff;
          background-color: #000;
        }
        .image-slot-error {
          display: flex;
          justify-content: center;
          align-items: center;
             width: 425px;
        height: 425px;
          font-size: 14px;
          font-family: "BankGothic";
          font-weight: 400;
          background-color: #000;

          color: #ffffff;
        }
      }
    }
  }
}
</style>