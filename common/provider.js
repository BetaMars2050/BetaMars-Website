export const devProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
export const productProvider = 'https://bsc-dataseed1.binance.org/'
const env = process.env.NODE_ENV
export const Provider = {
    development: productProvider,
    production: productProvider,
}[env]
