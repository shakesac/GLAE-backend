import axios from 'axios'

const headers = {
    Accept: "application/json",
    ContentType: 'application/x-www-form-urlencoded',
}

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1',
    /*withCredentials: true,
    credentials: 'include',*/
    headers
});


//Intersepta os requests e adiciona o header x-access-token caso o utilizador esteja logado.
api.interceptors.request.use((config) => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
        config.headers['x-access-token'] = user.token
    }
      return config
    }, 
    (error) => {
      return Promise.reject(error)
    }
)

export default api;