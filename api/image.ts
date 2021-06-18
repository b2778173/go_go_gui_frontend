/* eslint-disable import/prefer-default-export */
import request from "./request"

export function uploadImage(data: FormData): Promise<any> {
  const url = `/image`
  return request.post(url, data, { headers: { isAuth: true } })
}
