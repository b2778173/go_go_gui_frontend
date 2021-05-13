import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { createStore, Store, applyMiddleware } from "redux"
import { createWrapper } from "next-redux-wrapper"

import logger from "redux-logger"
import { UserState } from "./reducer/user"
import combineReducer from "./reducer"

export interface State {
  user: UserState
}

// create a makeStore function
const makeStore = () => {
  const isServer = typeof window === "undefined"
  if (isServer) {
    return createStore(combineReducer, applyMiddleware(logger))
  }
  // we need it only on client side
  const persistConfig = {
    key: "user",
    debug: true,
    whitelist: ["user"], // make sure it does not clash with server keys
    storage
  }

  const persistedReducer = persistReducer(persistConfig, combineReducer)
  const store: any = createStore(persistedReducer, applyMiddleware(logger))
  // eslint-disable-next-line no-underscore-dangle
  store.__persistor = persistStore(store)
  return store
}

// export an assembled wrapper
// const persistor = persistStore(makeStore()) // Nasty hack

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true })

// export { persistor, wrapper }
