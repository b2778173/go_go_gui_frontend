import request from "./request"

export function dayMover(start: number, count: number): Promise<any> {
  const url = `/day_mover?start=${start}&count=${count}`
  return request.get(url)
}

export function quote(symbols: string[]): Promise<any> {
  const url = `/quote`
  return request.post(url, { symbols })
}

export function lookup(symbol: string): Promise<any> {
  const url = `/stock/lookup?symbol=${symbol}`
  return request.get(url)
}
