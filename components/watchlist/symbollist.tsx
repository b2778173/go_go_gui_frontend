import {Button, Table} from 'antd';
import {useEffect, useState} from "react";
import {getAllWatchlist, getSymbolList, addWatchlist} from "../../api/watchlist";
import {
    PlusOutlined
} from "@ant-design/icons"

const SymbolList = (props: any) => {
    let count = 0;

    const [symbolList, setSymbolList] = useState([{symbol:'', name:'', currency:'',stockExchange:0,exchangeShortName:''}]);
    const [watchlist, setWatchlist] = useState([{_id:'', marketCap:'', price:0}]);

    const addSymbolToWatchlistHandler = function (symbol: string | number | readonly string[] | undefined) {
        let req = symbolList.filter(obj => {
            return obj.symbol == symbol;
        });
        addWatchlist(req[0]);
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
            render: (text: any, record: { symbol: string | number | readonly string[] | undefined; }) => (
                <Button value={record.symbol} shape="circle" icon={<PlusOutlined />} onClick={() => {
                    addSymbolToWatchlistHandler(record.symbol);
                }} />
            )
                // <Button shape="circle" icon={<PlusOutlined />} />,
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