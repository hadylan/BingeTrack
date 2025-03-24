import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
})

export default apiClient
