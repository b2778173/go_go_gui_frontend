import Head from "next/head"
import React, { useState, useEffect } from "react"
import { Card, Skeleton, Table, Row, Col } from "antd"
import styles from "../styles/Home.module.css"
import Footer from "../components/footer"
// import Chart from "../components/chart/chart"
import AreaChart from "../components/chart/areaChart"
import getData from "./api/test"
import { generalNews } from "./api/news"

function Home() {
  const [noTitleKey, setKey] = useState("app")
  const [loading, setLoading] = useState(false)
  const [data, setData]: [any, any] = useState(null)
  // second arugs is empty , the useEffect just run once --> componentDidMounted
  useEffect(() => {
    async function fetchData() {
      const ChartResponse = await getData()
      setData(ChartResponse)
      const response = await generalNews("general")
      console.log(response)
    }
    fetchData()
  }, [])
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
  //

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
                {data && (
                  <AreaChart
                    data={data}
                    type="svg"
                    width={500}
                    height={200}
                    ratio={1}
                  />
                )}
              </Col>
              <Col span={8}>
                {data && (
                  <AreaChart
                    data={data}
                    type="svg"
                    width={500}
                    height={200}
                    ratio={1}
                  />
                )}
              </Col>
              <Col span={8}>
                {data && (
                  <AreaChart
                    data={data}
                    type="svg"
                    width={500}
                    height={200}
                    ratio={1}
                  />
                )}
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

export default Home

// Home.getInitialProps = async () => {
//   const response = await getData()
//   return { data: response }
// }
