import React, { useState, useEffect } from 'react';
import {
  Chart,
  Point,
  View,
  Tooltip,
  Schema,
  Axis,
  Interval,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import axios from 'axios';


 function Charts() {
   const [data, setData] = useState();

   function initBidData() {
    const url = 'https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1612108800&to=1612540800&token=c07nu3v48v6retjanc0g&fbclid=IwAR2zi1pkFhR881g63nv8tP36qkBW02EkiNM3-q6YxUV0TFTJk5agCCz99Gw'

    axios.get(url)
    .then(function (response) {
      const data1 = response.data
      setData(data1)     
      console.log('data1',data1) 
      console.log('data',data) 
    })
    .catch((error) => { console.error(error) })
   }
   useEffect(() => {
    initBidData() 

    //  fetch('https://alifd.alibabausercontent.com/materials/@bizcharts/candlestick-basic/0.3.2/mock.json')
    //    .then(res => res.json())
    //    .then(data => {
    //       const ds = new DataSet();
    //       const dv = ds.createView();
    //       console.log('dv1',dv)
    //       dv.source(data)
    //         .transform({
    //           type: 'map',
    //           callback: obj => {
    //             obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
    //             obj.range = [obj.start, obj.end, obj.max, obj.min];
    //             return obj;
    //           }
    //         });
    //        console.log(dv)
    //        setData(dv.rows);
    //    })
   }, [])
   
   return (
   <>
   <Chart
     height={400}
     padding={[10, 40, 40, 40]}
     data={data}
     autoFit
     scale={{
        time: {
        type: 'timeCat',
        range: [0, 1],
        tickCount: 4,
        },
        
        v: { alias: '成交量' },
        o: { alias: '开盘价' },
        c: { alias: '收盘价' },
        h: { alias: '最高价' },
        l: { alias: '最低价' },
        t: { alias: '成交時間' }
     }}
   >
     <Tooltip
        showTitle={false}
        showMarkers={true}
        itemTpl={'<li class="g2-tooltip-list-item" data-index={index}>'
          + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
          + '{name}{value}</li>'}
     />
    <View
      data={data}
      region={{
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.7 },
      }}
    >
      <Schema
        position={'time*range'}
        shape={'candle'}
        color={[
          'trend', val => {
            if (val === '上涨') {
              return '#f04864';
            }
    
            if (val === '下跌') {
              return '#2fc25b';
            }
          }
        ]}
        tooltip={[
        't*o*c*h*l',
        (t, o, c, h, l) => {
          return {
            name: t,
            value: '<br><span style="padding-left: 16px">开盘价：' + o + '</span><br/>'
              + '<span style="padding-left: 16px">收盘价：' + c + '</span><br/>'
              + '<span style="padding-left: 16px">最高价：' + h + '</span><br/>'
              + '<span style="padding-left: 16px">最低价：' + l + '</span>'
          }}
        ]}
      />
    </View>
    <View
      data={data}
      region={{
        start: { x: 0, y: 0.7 },
        end: { x: 1, y: 1 },
      }}
      scale={{
        volumn: {
          tickCount: 2,
        }
      }}
    >
    <Axis name="time" tickLine={null} label={null} />
    <Axis name="volumn"
      label={{
          formatter: val => {
            return +val / 1000 + 'k';
          }
        }}
    />
    <Interval
      position={'time*volumn'}
      color={['trend', val => {
        if (val === '上涨') {
          return '#f04864';
        }

        if (val === '下跌') {
          return '#2fc25b';
        }
      }]}
      tooltip={['time*volumn', (t, v) => {
        return {
          name: t,
          value: '<br/><span style="padding-left: 16px">成交量：' + v + '</span><br/>'
        };
      }]}
    />
    </View>
  </Chart>
  </>
  )
 }
 
 export default Charts