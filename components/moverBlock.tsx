import React, { useEffect } from "react"

function MoverBlock(prop: { dateRange: string }) {
  useEffect(() => {
    // componentDidMounted && componentDidUpdat
    const block = document.getElementById("block")
    function fetchData() {
      const script = document.createElement("script")
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js"
      script.async = true
      script.innerHTML = JSON.stringify({
        colorTheme: "light",
        dateRange: prop.dateRange,
        exchange: "US",
        showChart: true,
        locale: "uk",
        width: "100%",
        height: "100%",
        largeChartUrl: "",
        isTransparent: false,
        showSymbolLogo: false,
        plotLineColorGrowing: "rgba(33, 150, 243, 1)",
        plotLineColorFalling: "rgba(33, 150, 243, 1)",
        gridLineColor: "rgba(240, 243, 250, 1)",
        scaleFontColor: "rgba(120, 123, 134, 1)",
        belowLineFillColorGrowing: "rgba(33, 150, 243, 0.12)",
        belowLineFillColorFalling: "rgba(33, 150, 243, 0.12)",
        symbolActiveColor: "rgba(33, 150, 243, 0.12)"
      })
      if (block && !block.childNodes.length) {
        block.appendChild(script)
      }
    }
    fetchData()
    // componentDidUpdate && componentWillUnmount
    return () => {}
  })
  return <div id="block" style={{ width: "100%", height: "100%" }} />
}
MoverBlock.defaultProps = {
  dateRange: "12M"
}
export default MoverBlock
