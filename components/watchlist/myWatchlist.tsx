import { List } from 'antd';
import {useEffect, useState} from "react";
import {getAllWatchlist, mockSymbolList} from "../../api/watchlist";

const SymbolList = () => {

    const [resp, setResp] = useState([]);

    useEffect(
        () => {
            const response: any = getAllWatchlist();
            setResp(response);
            console.log("response",response);
        }
    )

    return(
        <>
            <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={resp}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </>

    )
}


export default SymbolList;