import { Menu, Dropdown, Avatar, Input } from "antd"
import {
  MailOutlined,
  AppstoreOutlined,
  // SettingOutlined,
  UserOutlined,
  DownOutlined
} from "@ant-design/icons"
import React, { useState } from "react"

import Link from "next/link"
import styles from "./styles/navbar.module.css"

import TickerTape from "./tickerTape"

import Watchlist from "./watchlist/watchlist"


function NavBar(props: { showTickerTap: boolean }) {
  const { showTickerTap } = props
  const [current, changeCurrent] = useState("mail")

  // component
  // const { SubMenu } = Menu
  const { Search } = Input
  // const { Option } = Select

  const avatarMenu = (
    <Menu>
      <Menu.Item>
        <Link href="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/user/login">Login</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/user/userinfo">會員中心</Link>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  )

  //   component css
  const styleAvatar = {
    display: "inline-flex",
    float: "right"
  }
  // handler
  const handleClick = (e: any) => {
    // console.log(e)
    changeCurrent(e.key)
  }
  const onSearch = (value: string) => {
    // console.log(value)
  }

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item
          key="favicon"
          icon={<MailOutlined />}
          style={{ width: "20%" }}>
          {/* Overview */}這裡放股咕雞圖
        </Menu.Item>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Overview
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          <Watchlist></Watchlist>
        </Menu.Item>
        {/* <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> */}
        <Menu.Item key="alipay">
          <Link href="/">Position</Link>
        </Menu.Item>
        <Menu.Item className={styles.noUnderline}>
          {/* <Input.Group> */}
          {/* <Select defaultValue="Option1">
              <Option value="Option1">Option1</Option>
              <Option value="Option2">Option2</Option>
            </Select> */}
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200, verticalAlign: "middle" }}
          />
          {/* </Input.Group> */}
        </Menu.Item>
        <Menu.Item className={styles.noUnderline}>
          <Dropdown overlay={avatarMenu} trigger={["click"]}>
            <div style={styleAvatar as any}>
              <a
                role="menuitem"
                tabIndex={0}
                className="ant-dropdown-link"
                onClick={(e: any) => e.preventDefault()}>
                <Avatar
                  shape="square"
                  size="large"
                  icon={<UserOutlined />}
                  className={styles.avatar}
                />
                name111 <DownOutlined />
              </a>
            </div>
          </Dropdown>
        </Menu.Item>
      </Menu>
      {showTickerTap && <TickerTape />}
    </>
  )
}

export default NavBar
