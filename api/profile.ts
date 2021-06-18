import request from "./request"
// category = general, forex, crypto, merger

interface Profile {
  username: string
  email: string
  uid?: string
  name?: string
  address?: any
  photoURL?: string
}

export function findProfileByToken(): Promise<any> {
  const url = `/profile`
  return request.get(url, { headers: { isAuth: true } })
}

export function createProfile(data: Profile): Promise<any> {
  const url = `/profile`
  return request.post(url, data, { headers: { isAuth: true } })
}

export function updateProfile(data: Profile): Promise<any> {
  const url = `/profile`
  return request.put(url, data, { headers: { isAuth: true } })
}
