import { AnyAction } from "redux"

export interface LogIn {
  username: string
  password: string
}

function login(payload: LogIn): AnyAction {
  return {
    type: "LOG_IN",
    payload: {
      username: payload.username,
      password: payload.password
    }
  }
}

function logout(): AnyAction {
  return { type: "LOG_OUT" }
}

export default {
  login,
  logout
}
