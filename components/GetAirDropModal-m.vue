<template>
  <div class="modal" :class="isShow ? 'show' : ''">
    <div class="dialog">
      <img src="../static/image/logo.png" alt="" class="logo" />
      <div class="nft-id">BSC nft id : {{ nftId }}</div>
      <div class="ticket" :class="id === 1 ? 'bg1' : 'bg2'">
        <el-image :src="imgUrl" class="ticket-img">
          <div slot="placeholder" class="image-slot-placeholder">
            <ImageLoading></ImageLoading>
          </div>

          <div slot="error" class="image-slot-error">Loading failed</div>
        </el-image>
      </div>
      <div class="bottom">
        <div class="btn" @click="download">download</div>
        <div class="btn" @click="close">close</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetamarsGetairdropmodalM",

  data() {
    return {};
  },
  props: {
    imgUrl: String,
    id: [Number, String],
    isShow: Boolean,
    imgBlob: [Object, String],
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

<style lang="scss" scoped>
.show {
  display: inherit !important;
}
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;

  background-color: rgba(#000, 0.8);
  z-index: 5;
  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      width: 368px;
      height: 36px;
    }
    .nft-id {
      width: 343px;
      height: 40px;
      background: url("../static/image/airdrop-id-bg.png");
      background-size: 100% 100%;
      font-size: 24px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 40px;
      margin-top: 10px;
    }
    .ticket {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 534px;
      height: 632px;

      .ticket-img {
        width: 335px;
        height: 514px;
        padding-right: 12px;
        .image-slot-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
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
    }

    .bg1 {
      background: url("../static/image/get_aridrop_bg1.png");
      background-size: 100% 100%;
    }
    .bg2 {
      background: url("../static/image/get_aridrop_bg2.png");
      background-size: 100% 100%;
    }
    .bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .btn:nth-child(2) {
        margin-left: 20px;
      }
      .btn {
        width: 280px;
        height: 92px;
        font-size: 32px;
        font-family: "BankGothic";
        font-weight: 400;
        color: #f76e23;
        letter-spacing: 3px;
        line-height: 92px;
        text-align: center;
        background: url("../static/image/airdrop-btn-bg-m.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>