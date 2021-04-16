import axios from "axios"
import request from "./request"

export function getAllWatchlist(): Promise<any> {
  const url = `/watchlist`
  return request.get(url)
}

export function quote(symbols: string[]): Promise<any> {
  const url = `/quote`
  return request.post(url, { symbols })
}

// Add watchlist
export function addWatchlist(symbols: string[]): Promise<any> {
  const url = `/add_watchlist`
  return request.post(url, { symbols })
}

// Resource https://financialmodelingprep.com/developer/docs/stock-ticker-symbol-lookup-api/
export function mockSymbolList(): Promise<any> {
  const url = `https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ&apikey=demo`
  return axios.get(url)
}
