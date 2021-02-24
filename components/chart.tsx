import TradingViewWidget, { Themes } from "react-tradingview-widget"
import React from "react"

function Chart(props: any) {
  const { symbols } = props
  return (
    <TradingViewWidget
      symbol={symbols}
      theme={Themes.LIGHT}
      locale="en"
      autosize
    />
  )
}

export default Chart
