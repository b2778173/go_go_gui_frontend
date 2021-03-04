import { scaleTime } from "d3-scale"
import { ChartCanvas, Chart, XAxis, YAxis, AreaSeries } from "react-stockcharts"
import React, { useState, useEffect } from "react"

function AreaChart(props: { data: any }) {
  const [width] = useState(600)
  const { data } = props
  return (
    <ChartCanvas
      width={width}
      height={400}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      seriesName="MSFT"
      data={data}
      type="svg"
      xAccessor={(d: any) => d.date}
      xScale={scaleTime()}
      xExtents={[new Date(2011, 0, 1), new Date(2013, 0, 2)]}>
      <Chart id={0} yExtents={(d: any) => d.close}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" />
        <AreaSeries yAccessor={(d: any) => d.close} />
      </Chart>
    </ChartCanvas>
  )
}

export default AreaChart
