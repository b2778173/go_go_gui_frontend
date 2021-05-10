import {Button, Table} from 'antd';
import {useEffect, useState} from "react";
import {getAllWatchlist, getSymbolList, addWatchlist, rmWatchlist} from "../../api/watchlist";
import {
    PlusOutlined, MinusOutlined
} from "@ant-design/icons"

const SymbolList = (props: any) => {

    const [symbolList, setSymbolList] = useState([{symbol:'', name:'', currency:'', stockExchange:'', exchangeShortName:''}]);
    const [watchlist, setWatchlist] = useState([{_id:'', marketCap:'', price:0}]);

    const insertAndDelHandler = (record: { symbol: string; }) => {
        if (watchlist.some(watchItem => watchItem._id == record.symbol)) {
            return "DEL";
        } else {
            return "ADD";
        }
    }

    const columns = [
        {
            title: "SYMBOL",
            dataIndex:"symbol",
            key: "symbol"
        },
        {
            title: "NAME",
            dataIndex:"name",
            key: "name"
        },
        {
            title: "CURRENCY",
            dataIndex:"currency",
            key: "currency"
        },
        {
            title: "STOCK EXCHANGE",
            dataIndex:"stockExchange",
            key: "stockExchange"
        },
        {
            title: "EXCHANGE SHORTNAME",
            dataIndex:"exchangeShortName",
            key: "exchangeShortName"
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: { symbol: string, name: string, currency: string, stockExchange: string, exchangeShortName: string }) => (
              <Button value={record.symbol} shape="circle"
                      icon={watchlist.some(
                        watchItem =>  watchItem._id == record.symbol) ? <MinusOutlined /> : <PlusOutlined />
                      }
                      onClick={() => {
                          let addDelBtn = insertAndDelHandler(record);
                          console.log('addDelBtn:',addDelBtn);
                          if (addDelBtn == 'ADD') {
                              addWatchlist(record).then(() => {
                                  getSymbolList().then((res: []) => {
                                      setSymbolList(res);
                                  });
                              }).then(() => {
                                  getAllWatchlist().then((res: []) => {
                                      setWatchlist(res);
                                  });
                              });
                          } else {
                              rmWatchlist(record.symbol).then(() => {
                                  getSymbolList().then((res: []) => {
                                      setSymbolList(res);
                                  });
                              }).then(() => {
                                  getAllWatchlist().then((res: []) => {
                                      setWatchlist(res);
                                  });
                              });
                          }
                      }
              }/>
            )
        },
    ]

    // retrieve open Ticker data
    useEffect(
        () => {
            const symbolResp: any = getSymbolList();
            symbolResp.then((res: []) => {
                let searchText = props.name;
                let searchResult;
                if (searchText) {
                    searchResult = res.filter((item: { symbol: String; }) => {
                        return item.symbol.indexOf(searchText) >= 0
                    });
                    setSymbolList(searchResult);
                } else {
                    setSymbolList(res);
                }
            });

            const watchListResp: any = getAllWatchlist();
            watchListResp.then((res: []) => {
                setWatchlist(res);
            });

        }, [props.name]
    )


    return(
        <>
            <Table columns={columns} dataSource={symbolList} rowKey={symbolList => symbolList.symbol}/>
        </>

    )
}


export default SymbolList;