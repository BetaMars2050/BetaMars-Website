import request from '@/utils/request'
const authApi = {
    login: '/platform/v1.0/auth/login/public',
    logout: '/platform/v1.0/auth/logout/public',
    getNonce: '/platform/v1.0/auth/nonce/public',
    withdraw: '/platform/v1.0/money/withdrawFront',
    retrieveLand: '/platform/v1.0/dig/retrieve',
    getWallet: 'https://gameapi.betamars.io/userprod/getWallet',
    getRevoInfo: 'https://gameapi.betamars.io/userprod/getRevoInfo',
    getEpInfo: 'https://gameapi.betamars.io/userprod/getEpInfo',
    getCurrentLandInfo: '/platform/v1.0/land/info',
    getLandRecord: '/platform/v1.0/land/profit/detail'
}
/***
 * game api
 * dev https://gameapi.betamars.io/user
 * pro https://gameapi.betamars.io/userprod
 */

export const login = (parameters) => {
    return request({
        url: authApi.login,
        method: 'post',
        params: parameters
    })
}

export const logout = (parameters) => {
    return request({
        url: authApi.logout,
        method: 'post',
        params: parameters
    })
}

export const getNonce = (parameters) => {
    return request({
        url: authApi.getNonce,
        method: 'get',
        params: parameters,
    })
}
export const getWallet = (parameters) => {
    return request({
        url: authApi.getWallet,
        method: 'get',
        params: parameters,
        // requireToken: true
    })
}
export const getRevoInfo = (parameters) => {
    return request({
        url: authApi.getRevoInfo,
        method: 'get',
        params: parameters,
        // requireToken: true
    })
}
export const getEpInfo = (parameters) => {
    return request({
        url: authApi.getEpInfo,
        method: 'get',
        params: parameters,
        // requireToken: true


    })
}
export const withdraw = (parameters) => {
    return request({
        url: authApi.withdraw,
        method: 'get',
        params: parameters,
        requireToken: true
    })
}

export const retrieveLand = (parameters) => {
    return request({
        url: authApi.retrieveLand,
        method: 'get',
        params: parameters,
        requireToken: true

    })
}
export const getCurrentLandInfo = (parameters) => {
    return request({
        url: authApi.getCurrentLandInfo,
        method: 'get',
        params: parameters,
        requireToken: true

    })
}


export const getLandRecord = (parameters) => {
    return request({
        url: authApi.getLandRecord,
        method: 'get',
        params: parameters,
        requireToken: true

    })
}
