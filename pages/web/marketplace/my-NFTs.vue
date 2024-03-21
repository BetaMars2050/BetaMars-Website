<template>
  <div>
    <div class="title"></div>
    <div class="tab">
      <div
        class="tab-item"
        :class="currentId === 1 ? 'current-tab-item' : ''"
        @click="toggleTab(1)"
      >
        Ticket NFT
      </div>
      <div
        class="tab-item"
        :class="currentId === 2 ? 'current-tab-item' : ''"
        @click="toggleTab(2)"
      >
        Land NFT
      </div>
      <div
        class="tab-item"
        :class="currentId === 3 ? 'current-tab-item' : ''"
        @click="toggleTab(3)"
      >
        Mystery Box
      </div>
    </div>
    <div class="content">
      <div class="ticket" v-if="currentId === 1">
        <div class="loading" v-if="isTicketLoadingShow">
          <ImageLoading />
        </div>
        <div
          class="empty"
          v-else-if="!isTicketLoadingShow && !ticketList.length && account"
        >
          <div class="empty-img"></div>
          <div class="empty-title">You don't have NFT yet</div>
        </div>
        <template
          v-else-if="!isTicketLoadingShow && ticketList.length && account"
        >
          <PersonalNFTsTickets
            v-for="(item, index) in ticketList"
            :key="item.tokenId"
            :index="index"
            :item="item"
          />
        </template>
      </div>
      <div class="land" v-if="currentId === 2">
        <div class="loading" v-if="isLandLoadingShow">
          <ImageLoading />
        </div>
        <div
          class="empty"
          v-else-if="!isLandLoadingShow && !landList.length && account"
        >
          <div class="empty-img"></div>
          <div class="empty-title">You don't have NFT yet</div>
          <!-- <div class="empty-btn" @click="getLand">To Get</div> -->
        </div>
        <template v-else-if="!isLandLoadingShow && landList.length && account">
          <PersonalNFTsLand
            v-for="(item, index) in landList"
            :key="index"
            :land="item"
            :id="item.id"
          />
        </template>
      </div>
      <div class="mystery-box" v-if="currentId === 3">
        <div class="empty">
          <div class="empty-img"></div>
          <div class="empty-title">You don't have mystery box yet</div>
          <!-- <div class="empty-btn" @click="getLand">To Get</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Contract } from "@/common/contract/index.js";
import { getUserNftListByContractAdd } from "@/api/tickets.js";
import { readUrlByIpfs } from "@/common/ipfs.js";

export default {
  name: "BetamarsMyNFTs",
  middleware: ["authentication"],

  data() {
    return {
      currentId: 1,
      landContract: null,
      contractAddressList: [],
      ids: [],
      isLandLoadingShow: false,
      isTicketLoadingShow: false,
      ticketContract: null,
      parmeters: {
        module: "account",
        action: "tokennfttx",
        contractaddress: Contract.ERC721ContractAdd,
        address: "",
        page: 1,
        offset: 100,
        startblock: 0,
        sort: "asc",
        endblock: 999999999,
        apikey: "UNR4XJX9SRPA14H6W42A2TIWUYZH4SVDWC",
      },
    };
  },
  computed: {
    ...mapGetters(["web3", "account", "landList", "ticketList"]),
  },
  watch: {
    account: {
      handler(val) {
        if (val) {
          this.getLandId();
          this.getTicketId();
        }
      },
      immediate: true,
    },
  },

  mounted() {},

  methods: {
    toggleTab(i) {
      this.currentId = i;
    },
    async getLandDetail() {
      let list = [];
      for (let index = 0; index < this.contractAddressList.length; index++) {
        try {
          let contract = new this.web3.eth.Contract(
            Contract.testABI,
            this.contractAddressList[index].address
          );

          let res = await contract.methods
            .NFT(this.contractAddressList[index].id)
            .call();
          res.id = this.contractAddressList[index].id;
          list.push(res);
        } catch (err) {
          console.log(err);
        }
      }
      console.log(list, "list");
      this.isLandLoadingShow = false;

      this.$store.commit("setLandList", list);
    },
    async getLandContract() {
      for (let index = 0; index < this.idList.length; index++) {
        try {
          let res = await this.landContract.methods
            .NFTAddr(this.idList[index])
            .call();
          this.contractAddressList.push({
            address: res,
            id: this.idList[index],
          });
        } catch (err) {
          console.log(err);
        }
      }
      console.log(this.contractAddressList);
      this.getLandDetail();
    },
    async getLandId() {
      let { landContractABI, landContractAdd, testABI } = Contract;

      this.landContract = new this.web3.eth.Contract(
        landContractABI,
        landContractAdd
      );
      if (!this.landList.length) {
        this.isLandLoadingShow = true;
      }

      try {
        let res = await this.landContract.methods.getUser(this.account).call();
        console.log(res, "land");
        this.idList = res;
        this.getLandContract();
      } catch (err) {
        this.isLandLoadingShow = false;
        this.$store.commit("setLandList", []);
      }
    },

    async getTicketId() {
      if (!this.ticketList.length) {
        this.isTicketLoadingShow = true;
      }

      this.parmeters.address = this.account;

      this.ticketContract = new this.web3.eth.Contract(
        Contract.ERC721ContractABI,
        Contract.ERC721ContractAdd
      );

      try {
        let arr = [getUserNftListByContractAdd(this.parmeters)];
        let res = await Promise.all(arr);
        console.log(res);
        let list = this.unique(res[0].result);

        console.log(list);
        this.getTicketInfo(list);
      } catch (err) {
        this.isTicketLoadingShow = false;
        this.$store.commit("setTicketList", []);
        console.log(err);
      }
    },
    async getTicketInfo(data) {
      let array = [];
      for (let index = 0; index < data.length; index++) {
        try {
          let addr = await this.ticketContract.methods
            .ownerOf(data[index].tokenID)
            .call();
          addr = addr.toUpperCase();
          if (addr === this.account.toUpperCase()) {
            let URI = await this.ticketContract.methods
              .tokenURI(data[index].tokenID)
              .call();
            console.log(URI);

            let imgUrl = await readUrlByIpfs(URI);
            console.log(imgUrl, "iommm");
            let obj = {
              tokenId: data[index].tokenID,
              _img: imgUrl.image || "",
            };
            array.push(obj);
          }
        } catch (err) {
          console.log(err);
        }
      }
      console.log(array, "array");
      this.$store.commit("setTicketList", array);
      this.isTicketLoadingShow = false;
    },
    unique(list) {
      const arr = new Map();
      return list.filter((v) => !arr.has(v.tokenID) && arr.set(v.tokenID, 1));
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 266px;
  height: 46px;
  background: url("../../../static/image/my-NFTs.png");
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 150px;
}
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #55340a;
  margin-top: 30px;
  .tab-item {
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    font-family: Ubuntu-Bold, Ubuntu;
    font-weight: bold;
    color: #868687;
    transition: all 0.4s;
    cursor: pointer;
  }
  .current-tab-item {
    position: relative;
    color: #fff !important;
  }
  .current-tab-item::before {
    position: absolute;
    bottom: 0px;
    left: 0px;
    content: " ";
    width: 300px;
    height: 2px;
    background: #ff9000;
  }
}
.content {
  width: 100%;
  min-height: 1136px;
  padding: 40px 0;
  background-color: #000;
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 500px;
  }
  .empty {
    position: absolute;
    top: 180px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .empty-img {
      width: 228px;
      height: 228px;
      background: url("../../../static/image/empty-img.png");
      background-size: 100% 100%;
    }
    .empty-title {
      font-size: 20px;
      font-family: "BankGothic";
      font-weight: 400;
      color: rgba($color: #ffffff, $alpha: 0.5);
      margin: 16px 0;
    }
    .empty-btn {
      width: 240px;
      height: 50px;
      background: url("../../../static/image/btn-stake.png");
      background-size: 100% 100%;
      text-align: center;
      line-height: 50px;
      font-size: 25px;
      font-family: "BankGothic";
      font-weight: 400;
      color: #ffee82;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
    }
  }
  .land,
  .ticket,
  .mystery-box {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 1420px;
    min-height: 1080px;
    background-color: #000;
    margin: 0 auto;
  }
}
</style>
<style  scoped>
</style>