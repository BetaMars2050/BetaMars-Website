export const devChainId = 97
export const productChainId = 56
const env = process.env.NODE_ENV
export const chainId = {
    development: productChainId,
    production: productChainId,
}[env]