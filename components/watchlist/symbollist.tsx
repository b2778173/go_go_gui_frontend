import {Button, Table} from 'antd';
import {useEffect, useState} from "react";
import {getAllWatchlist, getSymbolList, addWatchlist, rmWatchlist} from "../../api/watchlist";
import {
    CloseOutlined, PlusOutlined
} from "@ant-design/icons"

const SymbolList = (props: {name: string, onSymbollistLoading: (arg0: boolean) => void;}) => {

    const [symbolList, setSymbolList] = useState([{ currency: '', description: '', displaySymbol: '', figi: '', mic: '', symbol: '', type: '' }]);
    const [watchlist, setWatchlist] = useState([{_id:'', marketCap:'', price:0}]);

    const insertAndDelHandler = (record: { symbol: string; }) => {
        if (watchlist.some(watchItem => watchItem._id == record.symbol)) {
            return "DEL";
        } else {
            return "ADD";
        }
    }

    const sortData = (data: { currency: string, description: string, displaySymbol: string, figi: string, mic: string, symbol: string, type: string }[]) => {
        // Call slice to create a new Array and prevent mutating it if it's stored in state
        return data.slice().sort((a, b) => {
            var symbolA = a.symbol.toUpperCase(); // ignore upper and lowercase
            var symbolB = b.symbol.toUpperCase(); // ignore upper and lowercase
            if (symbolA < symbolB) {
                return -1;
            }
            if (symbolA > symbolB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }

    const columns = [
        {
            title: "SYMBOL",
            dataIndex:"symbol",
            key: "symbol"
        },
        {
            title: "CURRENCY",
            dataIndex:"currency",
            key: "currency"
        },
        {
            title: "Description",
            dataIndex:"description",
            key: "description"
        },
        {
            title: "EXCHANGE SHORTNAME(MIC)",
            dataIndex:"mic",
            key: "mic"
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text: any, record: { currency: string, description: string, displaySymbol: string, figi: string, mic: string, symbol: string, type: string }) => (
              <Button value={record.symbol} type="text"
                      icon={watchlist.some(
                        watchItem =>  watchItem._id == record.symbol) ? <CloseOutlined style={{ fontSize: '25px', color: '#eb2f96' }}  /> : <PlusOutlined style={{ fontSize: '25px',  color: '#52c41a' }} />
                      }
                      onClick={() => {
                          let addDelBtn = insertAndDelHandler(record);
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
            const symbolResp: Promise<any> = getSymbolList();
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
                props.onSymbollistLoading(false)
            });

            const watchListResp: any = getAllWatchlist();
            watchListResp.then((res: []) => {
                setWatchlist(res);
            });

            return () => {
                props.onSymbollistLoading(true)
                console.log("symbollist component unmount...")
            }

        }, [props.name]);


    return(
        <>
            <Table columns={columns} dataSource={sortData(symbolList)} rowKey={symbolList => symbolList.symbol}/>
        </>

    )
}


export default SymbolList;