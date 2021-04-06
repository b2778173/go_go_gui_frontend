import { Button, Space } from 'antd';

const SymbolType = () => {

    return(
        <>
            <Space direction={"horizontal"}>
                <Button shape="round" size={"middle"}>
                    Stock
                </Button>
                <Button shape="round" size={"middle"}>
                    Futures
                </Button>
                <Button shape="round" size={"middle"}>
                    Forex
                </Button>
            </Space>
        </>

    )
}


export default SymbolType;