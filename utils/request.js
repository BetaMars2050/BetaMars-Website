import axios from 'axios'
import { VueAxios } from './axios'
import { getItem } from '@/storage/index.js'
import { authToken } from '@/storage/keys.js'
import { signOut } from "@/common/connectWallet.js";
import Vue from "vue";
// export const developmentUrl = '/request'
export const developmentUrl = 'https://test.betamars.io/plat'
export const productionUrl = 'https://www.betamars.io/plat/'
//
export const env = process.env.NODE_ENV
// 'http://13.212.91.13:8888/'
export const baseURL = {
  development: 'https://betamars.io/',
  production: 'https://betamars.io/',
}[env]


const request = axios.create({
  baseURL,
  timeout: 90000
})
const errorHandler = async (error) => {

  if (error.message.indexOf('401') > -1) {
    await signOut()
    window.location.reload()
  }
  return Promise.reject(error)
}


request.interceptors.request.use(
  (config) => {
    console.log(config, 'config')

    if (config?.requireToken) {
      config.headers['token'] = getItem(authToken)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  })



request.interceptors.response.use((response) => {
  console.log(response, 'response')
  // && (response.data.status === 0 || response.data.status === "1")
  if (response.status === 200 && response.data.status !== -1) {
    return response.data
  } else {
    return errorHandler(response.data)

  }
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
