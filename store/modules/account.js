
import { login, logout, getNonce, getWallet, getEpInfo, getRevoInfo } from "@/api/auth.js";
import { getItem, setItem, removeItem, getSessionItem } from '@/storage/index.js'
import { authToken, inviteCode } from '@/storage/keys.js'
import { Contract } from '@/common/contract/index.js'
import { formatFloat } from "@/common/index.js";


export const state = {
    myNFTsCurrentTab: 1,
    historyCurrentTab: 1,
    token: getItem(authToken),
    userWallet: null,
    userRevoInfo: null,
    userEpInfo: null,
    currentIdentity: 0,
    RevoChainBalance: '',
    EpChainBalance: '',
    currentLand: JSON.parse(window.sessionStorage.getItem("__CURRENT_LAND__")),
    landList: [],
    ticketList: [],
    minerRevoChainBal: '',
    minerEpChainBal: '',
    inviteCode: getSessionItem(inviteCode)

}
export const mutations = {
    setUserWallet(state, data) {
        state.userWallet = data
    },
    setUserRevoInfo(state, data) {
        state.userRevoInfo = data
    },
    setUserEpInfo(state, data) {
        state.userEpInfo = data
    },
    setMyNFTsCurrentTab(state, id) {
        state.myNFTsCurrentTab = id
    },
    setHistoryCurrentTab(state, id) {
        state.historyCurrentTab = id
    },
    setToken(state, token) {
        state.token = token
    },
    resetToken(state) {
        state.ticketList = []
        state.landList = []
        state.token = null
        removeItem(authToken)
    },
    setRevoChainBalance(state, data) {
        state.RevoChainBalance = data
    },
    setEpChainBalance(state, data) {
        state.EpChainBalance = data
    },
    setMinerRevoChainBal(state, data) {
        state.minerRevoChainBal = data
    },
    setMinerEpChainBal(state, data) {
        state.minerEpChainBal = data
    },
    setCurrentLand(state, data) {
        state.currentLand = data
    },
    setLandList(state, data) {
        state.landList = data
    },
    setTicketList(state, data) {
        state.ticketList = data
    },
    setCurrentIdentity(state, data) {
        state.currentIdentity = data
    }, setInviteCode(state, code) {
        state.inviteCode = code
    }
}

export const actions = {
    getUserProfile(store) {
        getWallet({ address: store.getters.account }).then(res => {
            console.log(res)
            store.commit('setUserProfile', res.data)
        }).catch(err => { console.log(err) })
    },
    async getUserNonce(store) {
        let { account } = store.getters
        let { data } = await getNonce({ address: account })
        return data
    },
    getWalletSign(store, nonce) {
        return new Promise((resolve, reject) => {
            let { web3, account } = store.getters
            console.log('web3',web3)
            web3.eth.personal.sign(
                web3.utils.utf8ToHex(nonce),
                account,
                (err, res) => {
                    if (err) {
                        reject(err)

                    } else {
                        resolve(res)
                    }
                }
            );
        })
    },
    async walletLogin(store, sign) {
        let { account, inviteCode } = store.getters
        let { data } = await login({ address: account, sign, inviteCode })
        setItem(authToken, data)
        store.commit('setToken', data)
        store.dispatch('getData')

    },
    getData(store) {
        store.dispatch('getWalletData')
        // store.dispatch('getRevoChainBalance')
        // store.dispatch('getEpChainBalance')
        // store.dispatch('getMinerRevoBal')
        // store.dispatch('getMinerEpBal')


    },
    async getWalletData(store) {
        let { account } = store.getters
        let res = await getWallet({ address: account })
        store.commit('setUserWallet', res.data)
        // store.dispatch('getMinerRevoBal')
        // store.dispatch('getMinerEpBal')
    },
    async getEpData(store) {
        let { account } = store.getters
        let res = await getEpInfo({ address: account })
        store.commit('setUserEpInfo', res.data)
    },
    async getRevoData(store) {
        let { account } = store.getters
        let res = await getRevoInfo({ address: account })
        store.commit('setUserRevoInfo', res.data)
    },
    // async getRevoChainBalance(store) {
    //     let { testEpContractAdd, testRevoContractAdd, testERC20ABI } = Contract;
    //     let contract = new store.getters.web3.eth.Contract(testERC20ABI, testRevoContractAdd)
    //     store.commit('setRevoContract', contract)
    //     let result = await contract.methods
    //         .balanceOf(store.getters.account)
    //         .call()
    //     store.commit('setRevoChainBalance', Number(store.getters.web3.utils.fromWei(result, "ether")))
    // },
    // async getEpChainBalance(store) {
    //     let { testEpContractAdd, testRevoContractAdd, testERC20ABI } = Contract;
    //     let contract = new store.getters.web3.eth.Contract(testERC20ABI, testEpContractAdd)
    //     store.commit('setEpContract', contract)
    //     let result = await contract.methods
    //         .balanceOf(store.getters.account)
    //         .call()
    //     store.commit('setEpChainBalance', Number(store.getters.web3.utils.fromWei(result, "ether")))
    // },
    // async getMinerRevoBal(store) {
    //     let { testEpContractAdd, testRevoContractAdd, testBurningContractABI, testBurningContractAdd } = Contract;
    //     let contract = new store.getters.web3.eth.Contract(testBurningContractABI, testBurningContractAdd)
    //     let result = await contract.methods
    //         .userAmount(store.getters.account, testRevoContractAdd)
    //         .call()
    //     store.commit('setMinerRevoChainBal', Number(store.getters.web3.utils.fromWei(result, "ether")))

    // },
    // async getMinerEpBal(store) {
    //     let { testEpContractAdd, testRevoContractAdd, testBurningContractABI, testBurningContractAdd } = Contract;
    //     let contract = new store.getters.web3.eth.Contract(testBurningContractABI, testBurningContractAdd)
    //     let result = await contract.methods
    //         .userAmount(store.getters.account, testEpContractAdd)
    //         .call()
    //     store.commit('setMinerEpChainBal', Number(store.getters.web3.utils.fromWei(result, "ether")))
    // },


}


export const getters = {
    myNFTsCurrentTab: (state) => state.myNFTsCurrentTab,
    historyCurrentTab: (state) => state.historyCurrentTab,
    token: (state) => state.token,
    userWallet: (state) => state.userWallet,
    currentIdentity: (state) => state.currentIdentity,
    RevoChainBalance: (state) => formatFloat(state.RevoChainBalance),
    EpChainBalance: (state) => formatFloat(state.EpChainBalance),
    userRevoInfo: (state) => state.userRevoInfo,
    userEpInfo: (state) => state.userEpInfo,
    currentLand: (state) => state.currentLand,
    landList: (state) => state.landList,
    ticketList: (state) => state.ticketList,
    minerRevoChainBal: (state) => state.minerRevoChainBal,
    minerEpChainBal: (state) => state.minerEpChainBal,
    inviteCode: (state) => state.inviteCode
}
