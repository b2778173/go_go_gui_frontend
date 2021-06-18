import { HYDRATE } from "next-redux-wrapper"
import { AnyAction } from "redux"
import "../../util/firebase"
import firebase from "firebase/app"
import "firebase/auth"
import Router from "next/router"
import { message } from "antd"

export interface UserState {
  isSignedIn: boolean
  currentUser: any
  // text: string
}

const defaultState: UserState = {
  isSignedIn: false,
  currentUser: null
  // text: ""
}

// some methods
const setToken = async (user: any) => {
  const idToken = await user.getIdToken()
  sessionStorage.setItem("idToken", idToken)
}

const logout = () => {
  sessionStorage.removeItem("idToken")
  firebase.auth().signOut()
  Router.push("/user/login")
}

const logIn = (username: string, password: string) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      // Signed in
      const { user } = userCredential
      if (user) {
        setToken(user)
        Router.push("/")
      }
    })
    .catch((error) => {
      message.error(error.code, 3)
    })
}

function reducer(
  state: UserState = defaultState,
  action: AnyAction
): UserState {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }

    case "SET_USER":
      return { ...state, ...action.payload }

    case "LOG_IN":
      logIn(action.payload.username, action.payload.password)
      return { ...state }

    case "LOG_OUT":
      logout()
      return { ...state }
    case "CREATE_USER":
      // logout()
      return { ...state }
    // case "SET_TEXT":
    //   return { ...state, text: action.payload.text }

    default:
      return state
  }
}

export default reducer
