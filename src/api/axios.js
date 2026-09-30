import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Vite's proxy sends this to http://localhost:5000
  withCredentials: true, // sends/receives the login cookie
})

export default api