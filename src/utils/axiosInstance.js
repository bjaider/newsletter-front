import axios from 'axios'
const token = localStorage.getItem('token')
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: token
    ? {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      },
})
