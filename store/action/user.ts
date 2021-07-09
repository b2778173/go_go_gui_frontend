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

function resetPassword(email: string): AnyAction {
  return {
    type: "RESET_PASSWORD",
    payload: {
      email
    }
  }
}
function reAutheticate(credential: {
  username: string
  password: string
}): AnyAction {
  return {
    type: "RE_AUTHENTICATE",
    payload: {
      credential
    }
  }
}
export default {
  login,
  logout,
  resetPassword,
  reAutheticate
}
