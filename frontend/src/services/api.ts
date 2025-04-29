import axios from 'axios'

const API_URL = 'http://localhost:5000/api'  // Update this with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export const login = (username: string, password: string) => {
  return api.post('/login', { username, password })
}

export const createLink = (url: string, customSlug?: string) => {
  return api.post('/links', { url, customSlug })
}

export default api
