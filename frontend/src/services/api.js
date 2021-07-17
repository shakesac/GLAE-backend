import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        Accept: "application/json",
        Authorization: "Bearer " + yourJWTToken
    }
});

export default api;