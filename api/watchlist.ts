import request from "./request"

export function getAllWatchlist(): Promise<any> {
  const url = `/watchlist/getAllWatchlist`
  return request.get(url)
}

// Add watchlist
export function addWatchlist(req: {
  symbol: string,
  name: string,
  currency: string,
  stockExchange: number,
  exchangeShortName: string}
): Promise<any> {
  const url = `/watchlist/addWatchlist`
  return request.post(url, req)
}

export function delWatchlist(req: object): Promise<any> {
  const url = `/delWatchList`
  return request.post(url, { req })
}

// Resource https://financialmodelingprep.com/developer/docs/stock-ticker-symbol-lookup-api/
export function getSymbolList(): Promise<any> {
  const url = `/watchlist/getSymbolList`
  return request.get(url)
}
