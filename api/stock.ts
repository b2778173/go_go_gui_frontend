import request from "./request"

// eslint-disable-next-line import/prefer-default-export
export function dayMover(start: number, count: number): Promise<any> {
  const url = `/day_mover?start=${start}&count=${count}`
  return request.get(url)
}
