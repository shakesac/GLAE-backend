import api from './api'

export const sectionService = {
    async new(payload) {
        const res = await api.post('/section/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async update(payload) {
      const res = await api.put('/section/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async get(payload) {
        const res = await api.get('/section/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAll(){
        const res = await api.get('/section/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async delete(payload) {
        const res = await api.delete('/section/delete/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async newSub(payload) {
        const res = await api.post('/section/sub/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async updateSub(payload) {
      const res = await api.put('/section/sub/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async getSub(payload) {
        const res = await api.get('/section/sub/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAllSub(){
        const res = await api.get('/section/sub/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async deleteSub(payload) {
        const res = await api.delete('/section/sub/delete/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    }
}
