// store.ts

import { createStore, AnyAction, Store } from "redux"
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper"

export interface State {
  isSigned: boolean
  currentUser: any
}

// create your reducer
const reducer = (
  state: State = { isSigned: false, currentUser: null },
  action: AnyAction
) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload }
    case "setIsSigned":
      return { ...state, tick: action.payload }
    default:
      return state
  }
}

// create a makeStore function
const makeStore: any = (context: Context) => createStore(reducer)

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true })
