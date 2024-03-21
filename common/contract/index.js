import * as devContract from './contract-dev.js'
import * as proContract from './contract-pro.js'
const env = process.env.NODE_ENV
export const Contract = {
    development: proContract,
    production: proContract,
}[env]
