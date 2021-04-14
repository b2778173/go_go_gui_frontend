import React, { useEffect, useState } from "react"
import { Modal, Button, Input, Row, Col, Divider, Space, Tabs } from "antd"
import SymbolType from "./symbolType"
import SymbolList from "./symbollist"
import SymbolSearchBar from "./searchBar"

const { TabPane } = Tabs

const Watchlist = () => {
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState("")

  const symbolSearchBarChangeHandler = (
    value: React.SetStateAction<string>
  ) => {
    setSearchText(value)
  }

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        Watchlist
      </Button>
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
              <SymbolList name={searchText} />
            </Space>
          </TabPane>
          <TabPane tab="My WatchList" key="2">
            {/* TODO */}
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
