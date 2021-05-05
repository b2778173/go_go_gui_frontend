// store.ts

import { createStore, AnyAction, Store } from "redux"
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper"

export interface State {
  isSignedIn: boolean
  currentUser: any
}

// create your reducer
const reducer = (
  state: State = { isSignedIn: false, currentUser: null },
  action: AnyAction
) => {
  const { isSignedIn, currentUser } = action

  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
    case "setIsSigned":
      return { ...state, isSignedIn, currentUser }
    default:
      return state
  }
}

// create a makeStore function
const makeStore: any = (context: Context) => createStore(reducer)

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true })
