import { HYDRATE } from "next-redux-wrapper"
import { AnyAction } from "redux"
import "../util/firebase"
import firebase from "firebase/app"
import "firebase/auth"
import Router from "next/router"
import { message } from "antd"

export interface State {
  isSignedIn: boolean
  currentUser: any
  text: string
}

const defaultState = {
  isSignedIn: false,
  currentUser: null,
  text: ""
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

export default function reducer(
  state: State = defaultState,
  action: AnyAction
): State {
  console.log("action=", action)
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
    case "setIsSignedInUser":
      return {
        ...state,
        isSignedIn: action.payload.isSignedIn,
        currentUser: action.payload.currentUser
      }
    case "logIn":
      logIn(action.payload.username, action.payload.password)
      return { ...state, ...action.payload }
    case "logout":
      logout()
      return { ...state, ...action.payload }
    case "searchInput":
      return { ...state, text: action.payload.text }

    default:
      return state
  }
}
