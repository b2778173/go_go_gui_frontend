/* eslint-disable no-underscore-dangle */
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { createStore, Store, applyMiddleware, combineReducers } from "redux"
import { createWrapper } from "next-redux-wrapper"

import logger from "redux-logger"
import userReducer from "../reducer/user"

export interface State {
  isSignedIn: boolean
  currentUser: any
  text: string
}

// create your reducer
const combineReducer: any = combineReducers({
  user: userReducer
})

// create a makeStore function
const makeStore = () => {
  const isServer = typeof window === "undefined"
  if (isServer) {
    return createStore(combineReducer, undefined, applyMiddleware(logger))
  }
  // we need it only on client side

  const persistConfig = {
    key: "nextjs",
    debug: true,
    whitelist: ["isSignedIn", "currentUser", "text"], // make sure it does not clash with server keys
    storage
    // stateReconciler: autoMergeLevel2
  }

  const persistedReducer = persistReducer(persistConfig, combineReducer)
  const store: any = createStore(persistedReducer)

  return store
}

// export an assembled wrapper
export const persistor = persistStore(makeStore()) // Nasty hack

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true })

// export const setClientState = (clientState) => ({
//   type: "SET_CLIENT_STATE",
//   payload: clientState
// })
