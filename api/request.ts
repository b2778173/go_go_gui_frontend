import axios from "axios"
import { message } from "antd"
import Router from "next/router"

// import Cookies from "js-cookie"

// const accessToken = Cookies.get("Authorization")
const request = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
// Add a request interceptor
request.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    const { CancelToken } = axios
    const source = CancelToken.source()
    config.cancelToken = source.token
    // get token from Storage
    const idToken = sessionStorage.getItem("idToken")
    if (idToken) {
      config.headers.idToken = idToken
    } else {
      // cancel req with no error message
      source.cancel()
      Router.push("/user/login")
    }
    return config
  },
  (error: any) => {
    // Do something with request error
    console.log(222)
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  (response: any) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.result
  },
  (error: any) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // show error msg with message
    if (error.message) {
      message.error(error.message, 3)
    }
    return Promise.reject(error)
  }
)
export default request
