import axios from 'axios'

const jwt = document.cookie.jwt
const headers = {
    Accept: "application/json",
    ContentType: 'application/x-www-form-urlencoded',
    Authentication: jwt,
}


console.log(jwt)

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers
});

export default api;