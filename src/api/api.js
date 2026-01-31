import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

console.log('API_BASE_URL:', API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (credentials) => api.post('/user/login', credentials),
  signup: (userData) => api.post('/user/signup', userData),
}

export const urlAPI = {
  shorten: (urlData) => api.post('/shorten', urlData),
  getAll: () => api.get('/allurl'),
  delete: (id) => api.delete(`/${id}`),
}

export default api