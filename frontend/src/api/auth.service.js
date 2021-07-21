import api from './api'

export const authService = {
    async login(payload) {
      const res = await api.post('/login', payload)
      if (res.status == 200) {
        const token = res.data.data.token
        const profile = res.data.data.user
        return { token, profile }
      } else {
        Swal.fire({
          icon: 'error',
          title: res.status,
          text: res.data.message,
        })
        throw new Error(res)
      }
    },
    async register(payload) {
      const res = await api.post('/register', payload)
      if (res.ok) {
        return await res.json()
      } else {
        throw Error(handleResponses(res.status))
      }
    },
    /*
    async getInfo(token) {
      const response = await fetch(`${API_URL}/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      return await response.json();
    }  */
  }
  
  export default authService;