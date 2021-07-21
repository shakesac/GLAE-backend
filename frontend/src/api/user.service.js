import api from './api'
import { handleResponses } from './err.service'

export const authService = {
    async login(payload) {
      const res = await api.post('/login', payload)
      if (res.status == 200) {
        const token = res.data.data.token
        const profile = res.data.data.user
        return { token, profile }
      } else {
        throw Error(handleResponses(res))
      }
    },
    async register(payload) {
      const res = await api.post('/register', payload)
      if (res.ok) {
        return res
      } else {
        throw new Error(res)
      }
    },
}