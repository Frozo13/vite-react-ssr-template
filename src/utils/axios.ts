import axios from 'axios'

export { $axios }

const $axios = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
})
