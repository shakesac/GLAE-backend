import api from './api'

export const authService = {
    async new(payload) {
        const res = await api.post('/item/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async update(payload) {
      const res = await api.put('/item/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async get(payload) {
        const res = await api.get('/item/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAll(){
        const res = await api.get('/item/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async delete(payload) {
        const res = await api.delete('/item/delete/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async newType(payload) {
        const res = await api.post('/item/type/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async updateType(payload) {
      const res = await api.put('/item/type/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async getType(payload) {
        const res = await api.get('/item/type/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAllType(){
        const res = await api.get('/item/type/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async deleteType(payload) {
        const res = await api.delete('/item/type/delete/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async newCategory(payload) {
        const res = await api.post('/item/category/new', payload)
        if (res.ok) {
          return res
        } else {
          throw new Error(res)
        }
      },
    async updateCategory(payload) {
      const res = await api.put('/item/category/update/'+payload.id, payload)
      if (res.status == 200) {
        return res
      } else {
        throw new Error(res)
      }
    },
    async getCategory(payload) {
        const res = await api.get('/item/category/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async getAllCategory(){
        const res = await api.get('/item/category/all')
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    },
    async deleteCategory(payload) {
        const res = await api.delete('/item/category/delete/'+payload.id)
        if (res.status == 200) {
            return res
        } else {
            throw new Error(res)
        }
    }
}
