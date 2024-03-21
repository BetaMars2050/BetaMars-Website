import { getItem, setItem } from "@/storage/index.js";
import { cachedProvider } from "@/storage/keys.js";
import { Provider } from "@/common/provider.js";
import { chainId as id } from "@/common/chanId";
import Web3 from "web3";
import { Contract } from "@/common/contract/index.js";
import WalletConnectProvider from "@walletconnect/web3-provider";
export const state = () => ({
  web3: null,
  account: "",
  isNetworkModalShow: false,
  epContract: null,
  revoContract: null,
});
export const mutations = {
  setWeb3(state, provider) {
    try {
      state.web3 = new Web3(Web3.givenProvider);
    } catch (err) {}
  },
  setWeb3ByHttpProvider(state) {
    let provider = new Web3.providers.HttpProvider(Provider);
    try {
      state.web3 = new Web3(provider);
    } catch (err) {}
  },
  setAccount(state, account) {
    state.account = account;
  },
  setIsNetworkModalShow(state, data) {
    state.isNetworkModalShow = data;
  },
  setRevoContract(state, data) {
    state.revoContract = data;
  },
  setEpContract(state, data) {
    state.epContract = data;
  },
};
export const actions = {
  contractInit(store) {},
};

export const getters = {
  web3: (state) => state.web3 || new Web3(),
  account: (state) => state.account || "",
  isNetworkModalShow: (state) => state.isNetworkModalShow,
  revoContract: (state) => state.revoContract,
  epContract: (state) => state.epContract,
};
export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters,
};
