<template>
  <div class="modal" :class="isShow ? 'show' : ''">
    <div class="dialog">
      <img src="../static/image/logo.png" class="logo" alt="" />
      <!-- <div class="close"></div> -->
      <div class="tickets-id">BSC NFT ID : {{ nftId }}</div>
      <div class="airdrop-bg" :class="id === 1 ? 'bg1' : 'bg2'"></div>
      <el-image :src="imgUrl" class="airdrop-img">
        <div slot="placeholder" class="image-slot-placeholder">
          <ImageLoading></ImageLoading>
        </div>

        <div slot="error" class="image-slot-error">Loading failed</div>
      </el-image>

      <div class="download" @click="download">Download</div>
      <div class="close" @click="close">Close</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    imgUrl: String,
    id: [Number, String],
    isShow: Boolean,
    nftId: Number,
  },
  mounted() {},

  methods: {
    download() {
      const a = document.createElement("a");
      const url = this.imgUrl;
      if (!this.imgUrl) {
        return this.downloadFail();
      }
      this.$message({
        showClose: true,
        message: "Downloading...",
        type: "warning",
        duration: "3000",
      });
      try {
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            console.log(blob);
            a.href = URL.createObjectURL(blob);
            a.download = "BETAMARSTICKETS-" + this.nftId + ".png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
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
      this.$emit("hideGetAirdropModal");
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
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
  background: rgba($color: #000000, $alpha: 0.9);
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 547px;
    height: 731px;
    z-index: 9;


    .close {
      position: absolute;
      bottom: 40px;
      right: 10px;
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
      position: absolute;
      bottom: 40px;
      left: 10px;
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
    .tickets-id {
      position: absolute;
      top: 62px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 440px;
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
      width: 336px;
      height: 34px;
    }
    .airdrop-img {
      position: absolute;
      top: 50%;
      left: 49.5%;
      transform: translate(-50%, -50%);
      width: 297px;
      height: 465px;
      .image-slot-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 297px;
        height: 465px;
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
        width: 100%;
        height: 100%;
        font-size: 14px;
        font-family: "BankGothic";
        font-weight: 400;
        background-color: #000;

        color: #ffffff;
      }
    }

    .airdrop-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 522px;
      height: 652px;
      background: url("../static/image/get_aridrop_bg2.png");
      background-size: 100% 100%;
    }
    .bg1 {
      background: url("../static/image/get_aridrop_bg1.png");
      background-size: 100% 100%;
    }
    .bg2 {
      background: url("../static/image/get_aridrop_bg2.png");
      background-size: 100% 100%;
    }
  }
}
</style>
