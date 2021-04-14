import axios from "axios"
import { message } from "antd"

// import Cookies from "js-cookie"

// const accessToken = Cookies.get("Authorization")
const request = axios.create({
  baseURL: process.env.FLASK_API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
})
// Add a request interceptor
request.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    const idToken = sessionStorage.getItem("idToken")
    config.headers.idToken = idToken
    return config
  },
  (error: any) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  (response: any) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  (error: any) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    message.error(error.message, 3)
    return Promise.reject(error)
  }
)
export default request
