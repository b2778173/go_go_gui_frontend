/* eslint-disable no-underscore-dangle */
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { message } from "antd"
import { createStore, AnyAction, Store, applyMiddleware } from "redux"
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import "../util/firebase"
import firebase from "firebase/app"
import "firebase/auth"
import Router from "next/router"
import logger from "redux-logger"

export interface State {
  isSignedIn: boolean
  currentUser: any
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

// create your reducer
const reducer = (
  state: State = { isSignedIn: false, currentUser: null },
  action: AnyAction
) => {
  const { isSignedIn, currentUser, username, password } = action

  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }

    case "setIsSigned":
      return { ...state, isSignedIn, currentUser }
    case "logIn":
      logIn(username, password)
      return { ...state, isSignedIn: false, currentUser: null }

    case "logout":
      logout()
      return { ...state, isSignedIn: false, currentUser: null }

    default:
      return state
  }
}

// create a makeStore function
const makeStore = () => {
  const isServer = typeof window === "undefined"
  if (isServer) {
    return createStore(reducer, undefined, applyMiddleware(logger))
  }
  // we need it only on client side

  const persistConfig = {
    key: "nextjs",
    whitelist: ["reducer"], // make sure it does not clash with server keys
    storage
  }

  const persistedReducer = persistReducer(persistConfig, reducer)
  const store: any = createStore(persistedReducer)

  store.__persistor = persistStore(store) // Nasty hack

  return store
}

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true })

// export const setClientState = (clientState) => ({
//   type: "SET_CLIENT_STATE",
//   payload: clientState
// })
