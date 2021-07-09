import axios from "axios"
import { message } from "antd"
import Router from "next/router"
import getRefreshIdToken from "../util/auth"

// import Cookies from "js-cookie"

// const accessToken = Cookies.get("Authorization")
const isServer = typeof window === "undefined"
// console.log("isServer", isServer)
const request = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
// Add a request interceptor
request.interceptors.request.use(
  async (config: any) => {
    // Do something before request is sent
    const { isAuth } = config.headers
    const { CancelToken } = axios
    const source = CancelToken.source()
    config.cancelToken = source.token
    // get token from Storage
    // const idToken = sessionStorage.getItem("idToken")
    // const token = () =>
    // new Promise((resolve, reject) => {
    if (!isServer && isAuth) {
      try {
        // User is signed in.
        const idToken = await getRefreshIdToken()
        // console.log("idToken", idToken)
        sessionStorage.setItem("idToken", idToken)
      } catch (error) {
        // No user is signed in.
        message.error(error.message, 3)
        source.cancel()
        Router.push("/user/login")
      }

      // })
      config.headers.idToken = sessionStorage.getItem("idToken")
    }
    // config.headers.idToken = await token()
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
    return response.data.result
  },
  (error: any) => {
    const errorRes = error.response
    // console.log("errorRes", errorRes)

    // show error msg with message
    if (errorRes) {
      if (errorRes.status === 401) {
        // google firebase error structure
        message.error(error.response.data.message.message, 3)
      } else {
        message.error(error.response.data.message, 3)
      }
    }
    return Promise.reject(error)
  }
)
export default request
