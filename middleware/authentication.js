
import { getItem } from '@/storage/index.js'
import { authToken } from '@/storage/keys.js'
export default function ({ route, redirect }) {
    if (process.client) {
        let token = getItem(authToken)
        if (!token) {
            redirect({ path: '/web/home' })
        }
    }
}
