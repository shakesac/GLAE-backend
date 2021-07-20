import axios from 'axios'
import qs from 'qs'
let apiUrl = process.env.API_URL
apiUrl = 'http://127.0.0.1:5000/api/v1'
console.log(apiUrl)
const headers = {
    'accept': "application/json",
    //'content-type': 'application/x-www-form-urlencoded',
}

const api = axios.create({
    baseURL: apiUrl,
    headers
});

axios.interceptors.response.use((res) => {
  res.data = qs.stringify(data)
  console.log('RES: ', res.data)
},
(err => { return Promise.reject(err)})
)

//Intercepta os requests e adiciona o header x-access-token caso o utilizador esteja logado.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('STORAGE_ACCESS_TOKEN')
    if (token) {
        config.headers['x-access-token'] = token
    }
      return config
    }, 
    (error) => {
      return Promise.reject(error)
    }
)

export default api;