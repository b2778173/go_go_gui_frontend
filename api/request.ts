import axios from "axios"
import { message } from "antd"
import Router from "next/router"
import "../util/firebase"
import firebase from "firebase/app"
import "firebase/auth"

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
    const { CancelToken } = axios
    const source = CancelToken.source()
    config.cancelToken = source.token
    // get token from Storage
    // const idToken = sessionStorage.getItem("idToken")
    // const token = () =>
    // new Promise((resolve, reject) => {
    if (!isServer) {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          // User is signed in.
          const idToken = await user.getIdToken()
          sessionStorage.setItem("idToken", idToken)
          // resolve(idToken)
        } else {
          // No user is signed in.
          source.cancel()
          Router.push("/user/login")
          // reject()
        }
      })
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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // show error msg with message
    if (error.message) {
      // ant component
      if (error.response.status == '400') {
        message.error(error.response.data.message, 3);
      } else {
        message.error(error.message, 3);
        return Promise.reject(error)
      }
    }
  }
)
export default request
