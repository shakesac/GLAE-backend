import api from './api'

export const leaseService = {
    async new(payload) {
        const res = await api.post('/lease/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async update(payload) {
      const res = await api.put('/lease/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async get(payload) {
        const res = await api.get('/lease/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAll(){
        const res = await api.get('/lease/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async delete(payload) {
        const res = await api.delete('/lease/delete/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    }
}