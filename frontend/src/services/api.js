import axios from 'axios'
/*const headers = {
    Accept: "application/json",
    ContentType: 'application/x-www-form-urlencoded',
    Authentication: jwt,
}*/

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true,
    credentials: 'include',
    //headers
});

export default api;