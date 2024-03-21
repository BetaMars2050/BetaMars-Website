import { getItem, setItem, removeItem } from "@/storage/index.js";
import { cachedProvider } from "@/storage/keys.js";
import { Provider } from "@/common/provider.js";
import { chainId as id } from "@/common/chanId";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import store from "@/store";
import { logout } from "@/api/auth.js";
import Vue from "vue";
import { throttle } from "lodash";



export const setWeb3ByHttpProvider = () => {
  let provider = new Web3.providers.HttpProvider(Provider);
  let web3 = new Web3(provider);
  store().commit("setWeb3", web3);
};
export const checkWalletConnectStatus = () => {
  let item = getItem(cachedProvider);
  switch (item) {
    case "metaMask":
      reconnectMetaMask();
      break;
    case "walletConnect":
      reconnectWalletConnect();
      break;
    case "okx":
      reconnectOKX();
      break;
    default:
      // setWeb3ByHttpProvider();
      break;
  }
};
export const reconnectWalletConnect = () => {
  let provider = new WalletConnectProvider({
    rpc: {
      [id]: Provider,
    },
    chainId: id,
  });

  provider
    .enable()
    .then((result) => {
      store().commit("setAccount", result[0]);
      store().commit("setWeb3", provider);
      walletConnectSubEvent(provider);
      store().dispatch("getData");

      console.log(provider);
    })
    .catch((err) => {
      console.log("reset connect wallet error");
    });
};

export const reconnectOKX = async () => {
  if (typeof window.okxwallet !== "undefined") {
    console.log('window.okxwallet',window.okxwallet)
    store().commit("setWeb3", window.okxwallet);
    store()
      .state.web3.web3.eth.getAccounts()
      .then((res) => {
        console.log(res);
        if (!res.length) {
          signOut();
        } else {
          store().commit("setAccount", res[0]);
          metaMaskSubEvent();
          store().dispatch("getData");
        }
      })
      .catch((err) => {
        signOut();
        console.log(err);
      });
  }
};

export const reconnectMetaMask = async () => {
  if (window?.ethereum?.isMetaMask) {
    if (window.ethereum && window.ethereum.switchProvider) {
      // window.ethereum.switchProvider("metamask");
    }
    console.log('window.ethereum',window.ethereum)

    store().commit("setWeb3", window.ethereum);
    store()
      .state.web3.web3.eth.getAccounts()
      .then((res) => {
        console.log(res);
        if (!res.length) {
          signOut();
        } else {
          store().commit("setAccount", res[0]);
          metaMaskSubEvent();
          store().dispatch("getData");
        }
      })
      .catch((err) => {
        signOut();
        console.log(err);
      });
  }
};
export const connectWalletconnect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let provider = new WalletConnectProvider({
        rpc: {
          [id]: Provider,
        },
        chainId: id,
      });
      let result = await provider.enable();
      store().commit("setAccount", result[0]);
      store().commit("setWeb3", provider);
      setItem(cachedProvider, "walletConnect");
      walletConnectSubEvent(provider);
      resolve(result);
    } catch (err) {
      reject(err);
      removeItem(cachedProvider);
    }
  });
};

export const connectOkxWallet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(window.okxwallet);
      let accounts = await window.okxwallet.request({
        method: "eth_requestAccounts",
      });
      store().commit("setAccount", accounts[0]);
      store().commit("setWeb3", window.okxwallet);
      setItem(cachedProvider, "okx");
      metaMaskSubEvent();
      resolve(accounts);
    } catch (err) {
      reject(err);
    }
  });
};
export const connectMetaMask = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum && window.ethereum.switchProvider) {
      // window.ethereum.switchProvider("metamask");
    }

    try {
      console.log(window.ethereum);
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      store().commit("setAccount", accounts[0]);
      store().commit("setWeb3", window.ethereum);
      setItem(cachedProvider, "metaMask");
      metaMaskSubEvent();
      resolve(accounts);
    } catch (err) {
      reject(err);
    }
  });
};
export const metaMaskSubEvent = () => {
  // MetamaskCheckNetwork();
  // subMetaMaskChainChange();
  subMetaMaskAccountsChange();
  subMetaMaskConnect();
};
export const subMetaMaskChainChange = () => {
  window.ethereum.on("chainChanged", (chainId) => {
    if (store().getters.web3.utils.hexToNumber(chainId) !== id) {
      store().commit("setIsNetworkModalShow", true);
    } else {
      store().commit("setIsNetworkModalShow", false);
    }
  });
};
export const subMetaMaskAccountsChange = () => {
  window.ethereum.on("accountsChanged", async (accounts) => {
    console.log(accounts, "accountsaccounts");
    if (!accounts.length) {
      await signOut();
      // window.location.reload();
    } else {
      switchWalletAccount(accounts[0]);
    }
  });
};
export const subMetaMaskConnect = () => {
  window.ethereum.on("connect", async (connectInfo) => {
    console.log(connectInfo, "isConnect");
    let isConnect = ethereum.isConnected();
    if (!isConnect) {
      await signOut();
      // window.location.reload();
    }
  });
};
export const walletConnectSubEvent = (provider) => {
  // checkWalletConnectNetwork(provider);
  // subWalletConnectChainChange(provider);
  subWalletConnectAccountsChange(provider);
  subWalletConnectConnect(provider);
};
export const subWalletConnectChainChange = (provider) => {
  provider.on("chainChanged", (chainId) => {
    console.log(chainId, "chainId");
  });
};
export const subWalletConnectAccountsChange = (provider) => {
  provider.on("accountsChanged", (accounts) => {
    console.log(accounts, "accounts");
    if (!accounts.length) {
      signOut();
      // window.location.reload();
    } else {
      switchWalletAccount(accounts[0]);
    }
  });
};
export const subWalletConnectConnect = (provider) => {
  provider.on("disconnect", (code, reason) => {
    console.log(code, reason, "code, reason");
    if (code === 1000) {
      signOut();
    }
  });
};
export const MetamaskCheckNetwork = (chainId) => {
  window.ethereum.request({ method: "eth_chainId" }).then((res) => {
    console.log(res);
    var chainId = store().getters.web3.utils.hexToNumber(res);
    if (chainId !== id) {
      store().commit("setIsNetworkModalShow", true);
    } else {
      store().commit("setIsNetworkModalShow", false);
    }
  });
};
export const checkWalletConnectNetwork = (provider) => {
  if (provider.chainId !== id) {
    console.log(provider.chainId, id, "current chain");
    store().commit("setIsNetworkModalShow", true);
    signOut();
  }
};
export const signOut = async () => {
  console.log("sign out");
  let _this = Vue.prototype;
  let item = getItem(cachedProvider);
  store().getters.token && (await logout({ token: store().getters.token }));
  store().commit("setAccount", null);
  store().commit("resetToken");
  removeItem(cachedProvider);
  if (item === "walletConnect") {
    store().state.web3.web3._provider.disconnect();
  }
};

export const switchWalletAccount = throttle(async function (account) {
  let _this = Vue.prototype;
  try {
    _this.$loading.show({ text: "Switching..." });
    store().commit("setAccount", account);
    store().getters.token && (await logout({ token: store().getters.token }));
    let nonce = await store().dispatch("getUserNonce");
    let sign = await store().dispatch("getWalletSign", nonce);
    await store().dispatch("walletLogin", sign);
    let item = getItem(cachedProvider);
    if (item === "metaMask") {
      store().commit("setWeb3", window.ethereum);
      setItem(cachedProvider, "metamask");
    }

    _this.$message({
      message: "Account switch success!",
      type: "warning",
    });
    _this.$loading.close();
  } catch (err) {
    console.log(err, "err");
    signOut();
    _this.$loading.close();
    _this.$message({
      message: "Account switch failed!",
      type: "warning",
    });
  }
}, 300);
