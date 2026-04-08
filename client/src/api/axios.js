import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

//instance for axios to reuse everywhere
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})



export default api;