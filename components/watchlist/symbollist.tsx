import {Button, Table} from 'antd';
import {useEffect, useState} from "react";
import {getAllWatchlist, mockSymbolList, addWatchlist} from "../../api/watchlist";
import {
    PlusOutlined
} from "@ant-design/icons"

const SymbolList = (props: any) => {
    let count = 0;

    const [resp, setResp] = useState([{symbol:'', name:'', currency:'',stockExchange:'',exchangeShortName:''}]);
    const [rowKey, setRowKey] = useState('');


    const addSymbolToWatchlistHandler = function (symbol: string | number | readonly string[] | undefined) {
        let req = resp.filter(obj => {
            return obj.symbol == symbol;
        });
        //TODO 新增Watchlist api
        // addWatchlist([req]);

    }

    const columns = [
        {
            title: "SYMBOL",
            dataIndex:"symbol"
        },
        {
            title: "NAME",
            dataIndex:"name"
        },
        {
            title: "CURRENCY",
            dataIndex:"currency"
        },
        {
            title: "STOCK EXCHANGE",
            dataIndex:"stockExchange"
        },
        {
            title: "EXCHANGE SHORTNAME",
            dataIndex:"exchangeShortName"
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
            const response: any = mockSymbolList();
            response.then((res: { data: any; }) => {
                let searchText = props.name;
                if (searchText) {
                    res.data = res.data.filter((item: { symbol: String; }) => {
                        return item.symbol.indexOf(searchText) >= 0;
                    });
                }
                setResp(res.data);
            });
        }, [props.name]
    )


    return(
        <>
            <Table columns={columns} dataSource={resp}/>
        </>

    )
}


export default SymbolList;