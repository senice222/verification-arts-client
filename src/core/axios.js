import axios from "axios";
const url = 'http://localhost:4000/api'
const $api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
})
$api.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
export default $api