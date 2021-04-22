import request from "./request"

export default function getAreaChartData(
  symbol: string,
  resolution: string,
  from: number,
  to: number
): Promise<any> {
  const url = `/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`
  return request.get(url)
}
