import request from '@/utils/request'
export const readUrlByIpfs = (url) => {
    return request({
        url,
        method: 'get',
    })
}
