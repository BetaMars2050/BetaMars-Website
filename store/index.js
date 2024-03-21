import Vue from 'vue'
import Vuex from 'vuex'
import { web3, account } from "./modules";
Vue.use(Vuex)
const state = {}
const mutations = {}
const actions = {}
const getters = {}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        web3, account
    },

})

export default () => store 