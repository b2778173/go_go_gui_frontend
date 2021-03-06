import axios from "axios"
import { message } from "antd"

// import Cookies from "js-cookie"

// const accessToken = Cookies.get("Authorization")
const request = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
})
// Add a request interceptor
request.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
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
    message.success("This is a success message", 3)
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
