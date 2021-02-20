import TradingViewWidget, { Themes } from 'react-tradingview-widget'

function Chart(props: any) {
  return (
    <TradingViewWidget
      symbol={props.symbols}
      theme={Themes.LIGHT}
      locale="en"
      autosize
    />
  )
}

export default Chart
