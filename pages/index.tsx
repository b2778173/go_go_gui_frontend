import Head from "next/head"
import React, { useState } from "react"
import { Card, Skeleton, Table, Row, Col } from "antd"
import styles from "../styles/Home.module.css"
import Footer from "../components/footer"
import Chart from "../components/chart"

export default function Home() {
  const [noTitleKey, setKey] = useState("app")
  const [loading, setLoading] = useState(false)
  const [data] = useState([])
  const tabListNoTitle = [
    {
      key: "Feed",
      tab: "News Feed"
    },
    {
      key: "News",
      tab: "Your News"
    }
    // {
    //   key: "Post",
    //   tab: "Post"
    // }
  ]
  const contentListNoTitle: any = {
    Feed: <p>Feed content</p>,
    News: <p>News content</p>,
    Post: <p>Post content</p>
  }
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    }
  ]

  const onTabChange = (key: any) => {
    console.log(key)
    setLoading(true)
    setKey(key)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <>
          <div className={styles.content}>
            <Row>
              <Col span={8}>
                <Chart />
              </Col>
              <Col span={8}>
                <Chart />
              </Col>
              <Col span={8}>
                <Chart />
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                {" "}
                <Card
                  style={{ maxWidth: "90%", minWidth: "200px" }}
                  tabList={tabListNoTitle}
                  activeTabKey={noTitleKey}
                  // tabBarExtraContent={<a href="#">More</a>}
                  onTabChange={(key) => {
                    onTabChange(key)
                  }}>
                  <Skeleton loading={loading} avatar active>
                    {contentListNoTitle[noTitleKey]}
                  </Skeleton>
                </Card>
              </Col>
              <Col span={8}>
                <Card bodyStyle={{ padding: 0 }}>
                  <Table columns={columns} dataSource={data} />
                </Card>
              </Col>
            </Row>
          </div>
        </>
      </main>
      <Footer />
    </div>
  )
}
