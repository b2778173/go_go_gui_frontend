import request from "./request"
// category = general, forex, crypto, merger
export function generalNews(category: string): Promise<any> {
  const url = `/news?=${category}`
  return request.get(url)
}

export function companyNews(
  symbol: string,
  from: string,
  to: string
): Promise<any> {
  const url = `/company_news?symbol=${symbol}&from=${from}&to=${to}`
  return request.get(url)
}
