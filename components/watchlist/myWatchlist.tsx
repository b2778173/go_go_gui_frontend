import { Table } from 'antd';
import {useEffect, useState} from "react";
import {getAllWatchlist} from "../../api/watchlist";

const MyWatchlist = () => {

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
          const response: any = getAllWatchlist();
          response.then((res: []) => {
            setWatchlist(res);
          });
          return () => console.log('unmounting myWatchlist component...');
        } , []
    )

  return(
    <>
      <Table columns={columns} dataSource={watchlist} rowKey={watchlist => watchlist._id}/>
    </>

  )
}


export default MyWatchlist;