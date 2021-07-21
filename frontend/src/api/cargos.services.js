import api from './api'

export const cargoService = {
    async new(payload) {
        const res = await api.post('/cargo/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async update(payload) {
      const res = await api.put('/cargo/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async get(payload) {
        const res = await api.get('/cargo/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAll(){
        const res = await api.get('/cargo/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async delete(payload) {
        const res = await api.delete('/cargo/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    }
}