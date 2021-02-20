import { Menu, Dropdown, Select } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Fragment, useState } from 'react'
import { Avatar } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from './styles/navbar.module.css'
import { Input } from 'antd'

function NavBar(props: any) {
  const [current, changeCurrent] = useState('mail')

  // component
  const { SubMenu } = Menu
  const { Search } = Input
  const { Option } = Select

  const avatarMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  )

  //   component css
  const styleAvatar = {
    display: 'inline-flex',
    float: 'right'
  }
  // handler
  const handleClick = (e: any) => {
    console.log(e)
    changeCurrent(e.key)
    console.log('The link was clicked.')
  }
  const onSearch = (value: string) => {
    console.log(value)
  }

  return (
    <Fragment>
      <Menu
        onClick={handleClick}
        selectedKeys={[props.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Navigation Three - Submenu"
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
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
            style={{ width: 200, verticalAlign: 'middle' }}
          />
          {/* </Input.Group> */}
        </Menu.Item>
        <Menu.Item className={styles.noUnderline}>
          <Dropdown overlay={avatarMenu} trigger={['click']}>
            <div style={styleAvatar as any}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar
                  shape="square"
                  size="large"
                  icon={<UserOutlined />}
                  className={styles.avatar}
                />
                name <DownOutlined />
              </a>
            </div>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Fragment>
  )
}

export default NavBar
