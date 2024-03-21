import request from '@/utils/request'
const ticketsApi = {
  getAirdrop: '/platform/ticket/v1/public/airdrop',
  getTicketRare: '/platform/ticket/v1/public/ticketRare',
  checkTicketStatus: '/platform/ticket/v1/public/checkTicket',
  gitTicketSaleTokenInfo: '/platform/v1.0/shop/queryToken/public'
}


export const getAirdrop = (parameters) => {
  return request({
    url: ticketsApi.getAirdrop,
    method: 'post',
    params: parameters
  })
}

export const getTicketRare = (parameters) => {
  return request({
    url: ticketsApi.getTicketRare,
    method: 'get',
    params: parameters
  })
}


export const checkTicketStatus = (parameters) => {
  return request({
    url: ticketsApi.checkTicketStatus,
    method: 'get',
    params: parameters
  })

}
export const gitTicketSaleTokenInfo = (parameters) => {
  return request({
    url: ticketsApi.gitTicketSaleTokenInfo,
    method: 'get',
    params: parameters

  })
}


export const getUserNftListByContractAdd = (parameters) => {
  return request({
    // https://api-testnet.bscscan.com/api dev
    // https://api.bscscan.com/api pro
    url: 'https://api.bscscan.com/api',
    method: 'post',
    params: parameters
  })
}

