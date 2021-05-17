import React, { useState } from "react"
import { Modal, Row, Space, Tabs, Spin } from "antd"
import SymbolType from "./symbolType"
import SymbolList from "./symbollist"
import SymbolSearchBar from "./searchBar"
import MyWatchlist from './myWatchlist'

const { TabPane } = Tabs

const Watchlist = () => {
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [loadingTab1, setLoadingTab1] = useState(true)
  const [loadingTab2, setLoadingTab2] = useState(true)

  const symbolSearchBarChangeHandler = (
    value: React.SetStateAction<string>
  ) => {
    setSearchText(value)
  }

  const loadingTab1IconHandler = (value: React.SetStateAction<boolean>) => {
    setLoadingTab1(value);
  }

  const loadingTab2IconHandler = (value: React.SetStateAction<boolean>) => {
    setLoadingTab2(value);
  }

  return (
    <>
      <span onClick={() => setVisible(true)}>
        WATCHLIST
      </span>
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Add Symbol" key="1">
            <Space direction="vertical">
              <Row>
                <SymbolSearchBar
                  onSymbolSearchBarChange={symbolSearchBarChangeHandler}
                />
              </Row>
              <Row>
                <SymbolType />
              </Row>
              <Spin size="large" spinning={loadingTab1}>
                <SymbolList name={searchText} onSymbollistLoading={loadingTab1IconHandler} />
              </Spin>
            </Space>
          </TabPane>
          <TabPane tab="My WatchList" key="2" destroyInactiveTabPane={true}>
            <Spin size="large" spinning={loadingTab2}>
              <MyWatchlist onSymbollistLoading={loadingTab2IconHandler}/>
            </Spin>
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Modal>
    </>
  )
}

export default Watchlist
