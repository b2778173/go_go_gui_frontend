import React, { useEffect } from "react"

function TickerTape() {
  useEffect(() => {
    // componentDidMounted && componentDidUpdate
    const chart: HTMLElement | null = document.getElementById("chart")
    if (chart) {
      const script = document.createElement("script")
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.async = true
      script.innerHTML = JSON.stringify({
        symbols: [
          {
            proName: "OANDA:SPX500USD",
            title: "S&P 500"
          },
          {
            proName: "OANDA:NAS100USD",
            title: "Nasdaq 100"
          },
          {
            proName: "FX_IDC:EURUSD",
            title: "EUR/USD"
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "BTC/USD"
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "ETH/USD"
          }
        ],
        colorTheme: "light",
        isTransparent: false,
        displayMode: "adaptive",
        locale: "in"
      })
      if (!chart.childNodes.length) {
        chart.appendChild(script)
      }
    }
    // componentDidUpdate && componentWillUnmount
    return () => {}
  })
  return <div id="chart" style={{ width: "100%" }} />
}

export default TickerTape
