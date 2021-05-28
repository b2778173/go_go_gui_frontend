import { Table } from 'antd';
import {useEffect, useState} from "react";
import {getAllWatchlist} from "../../api/watchlist";

const MyWatchlist =  (props: {
  reRender: any
  onSymbollistLoading: (arg0: boolean) => void}) => {

    const [watchlist, setWatchlist] = useState([{_id:'', market_cap:'', price:0}]);


  const columns =  [
      {
        title: "SYMBOL",
        dataIndex:"_id",
        key: "symbol"
      },
      {
        title: "MARKET CAP",
        dataIndex:"market_cap",
        key: "marketCap"
      },
      {
        title: "PRICE",
        dataIndex:"price",
        key: "price"
      }
    ]


    useEffect(
        () => {
          const apiGetAllWatchlist = () => {
            const response: any = getAllWatchlist()
            response.then((res: []) => {
              props.onSymbollistLoading(false) // start spinning
              setWatchlist(res);
              props.onSymbollistLoading(false) // stop spinning
            });
          }
          apiGetAllWatchlist()
          return () => {
            props.onSymbollistLoading(true)
            console.log('unmounting myWatchlist component...')
          }
        }, [props.reRender])

  return(
    <>
      <Table columns={columns} dataSource={watchlist} rowKey={watchlist => watchlist._id}/>
    </>
  );
}


export default MyWatchlist;