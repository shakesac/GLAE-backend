import api from './api'

export const userService = {
    async new(payload) {
        const res = await api.post('/user/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async update(payload) {
      const res = await api.put('/user/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async get(payload) {
        const res = await api.get('/user/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAll(){
        const res = await api.get('/user/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async delete(payload) {
        const res = await api.delete('/user/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    }
}