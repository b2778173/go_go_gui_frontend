import Head from "next/head"
import React, { useState, useEffect } from "react"
import { Card, Skeleton, Table, Row, Col, Radio, Button } from "antd"
import { ColumnsType } from "antd/es/table"
import { SyncOutlined } from "@ant-design/icons"
import styles from "../styles/Home.module.scss"
import Footer from "../components/footer"
// import Chart from "../components/chart/chart"
import AreaChart from "../components/chart/areaChart"
// import getData from "./api/test"
import { marketNews } from "./api/news"
import getAreaChartData from "./api/chart"

function Home() {
  const [tab, setTab] = useState("general")
  const [loading, setLoading] = useState(false)
  const [dowData, setDow]: [any, any] = useState(null)
  const [spData, setSP]: [any, any] = useState(null)
  const [nasdaqData, setNasdaq]: [any, any] = useState(null)
  const [feedNews, setFeedNews]: [any[], any] = useState([])
  const [forexNews, setForexNews]: [any, any] = useState([])
  const [rankData]: [any, any] = useState(null)
  // second arugs is empty , the useEffect just run once --> componentDidMounted

  const today = () => {
    return Math.round(new Date().getTime() / 1000)
  }

  const oneYearBefore = () => {
    const Y = new Date().getFullYear()
    const M = new Date().getMonth()
    const D = new Date().getDate()
    return Math.round(new Date(Y - 1, M, D).getTime() / 1000)
  }
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const chartApi = [
        getAreaChartData("DJI", "D", oneYearBefore(), today()),
        getAreaChartData("SPY", "D", oneYearBefore(), today()),
        getAreaChartData("NDX", "D", oneYearBefore(), today()),
        marketNews("general")
      ]
      const [res0, res1, res2, res3]: any = await Promise.all(chartApi)
      console.log("chartResponse=", res0, res1, res2, res3)
      setDow(res0)
      setSP(res1)
      setNasdaq(res2)
      setFeedNews(res3)
      setLoading(false)
    }
    fetchData()
  }, [])
  const tabListNoTitle = [
    {
      key: "general",
      tab: "News Feed"
    },
    {
      key: "forex",
      tab: "Forex News"
    }
  ]
  const feedColumns: ColumnsType<any> = [
    { title: "datetime", dataIndex: "datetime", key: "datetime" },
    {
      title: "headline",
      dataIndex: "headline",
      key: "headline",
      render: (headline: string, record: any) => {
        return (
          <a href={record.url} target="_blank" rel="noreferrer noopener">
            {headline}
          </a>
        )
      }
    },
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="" className={styles.newImg} />
      )
    }
  ]
  const forexColumns: ColumnsType<any> = [
    { title: "datetime", dataIndex: "datetime", key: "datetime" },
    {
      title: "headline",
      dataIndex: "headline",
      key: "headline",
      render: (headline: string, record: any) => {
        return (
          <a href={record.url} target="_blank" rel="noreferrer noopener">
            {headline}
          </a>
        )
      }
    },
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="" className={styles.newImg} />
      )
    }
  ]
  const contentListNoTitle: any = {
    general: (
      <Table
        columns={feedColumns}
        dataSource={feedNews}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    ),
    forex: (
      <Table
        columns={forexColumns}
        dataSource={forexNews}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    )
  }
  const moverColumns = [
    {
      title: "DAY GAINERS",
      dataIndex: "DAY_GAINERS",
      key: "DAY_GAINERS",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "DAY LOSERS",
      dataIndex: "DAY_LOSERS",
      key: "DAY_LOSERS"
    },
    {
      title: "MOST ACTIVES",
      dataIndex: "MOST_ACTIVES",
      key: "MOST_ACTIVES"
    }
  ]

  const positionColumns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "%Change",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Last Price",
      dataIndex: "last",
      key: "last"
    }
  ]
  //
  const handleResolutionChange = (e: any) => {
    // this.setState({ size: e.target.value });
    console.log(e)
  }
  const onTabChange = async (key: any) => {
    console.log("onTabChange")
    console.log(key)
    setTab(key)
    setLoading(true)
    let response = null
    if (key === "forex" && !forexNews.length) {
      response = await marketNews(key)
      setForexNews(response)
    } else if (key === "general" && !feedNews.length) {
      response = await marketNews(key)
      setFeedNews(response)
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      {/* {console.log("feedNews", feedNews)}
      {console.log("forexNews", forexNews)} */}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <>
          <div className={styles.content}>
            {/* area chart */}
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  {dowData && (
                    <div>
                      <AreaChart
                        data={dowData}
                        type="svg"
                        width={400}
                        height={200}
                        ratio={1}
                      />
                      <Radio.Group
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="D">D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">M</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  {spData && (
                    <div>
                      <AreaChart
                        data={spData}
                        type="svg"
                        width={400}
                        height={200}
                        ratio={1}
                      />
                      <Radio.Group
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="D">D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">M</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  {nasdaqData && (
                    <div>
                      <AreaChart
                        data={nasdaqData}
                        type="hybrid"
                        width={400}
                        height={200}
                        ratio={1}
                      />
                      <Radio.Group
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="D">D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">M</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              {/* </Row> */}
              {/* news */}
              {/* <Row gutter={[16, 16]}> */}
              <Col span={16}>
                <Card
                  className={styles.newsCard}
                  // style={{ maxWidth: "90%", minWidth: "200px" }}
                  tabList={tabListNoTitle}
                  activeTabKey={tab}
                  // tabBarExtraContent={<a href="#">More</a>}
                  onTabChange={(key) => {
                    onTabChange(key)
                  }}>
                  <Skeleton loading={loading} avatar active>
                    {contentListNoTitle[tab]}
                  </Skeleton>
                </Card>
              </Col>

              <Col span={8}>
                {/* popluar ranking */}
                <Card
                  extra={<Button shape="circle" icon={<SyncOutlined />} />}
                  bodyStyle={{ padding: 0 }}
                  style={{ marginBottom: "8px" }}>
                  <Table columns={moverColumns} dataSource={rankData} />
                </Card>
                {/* position */}
                <Card bodyStyle={{ padding: 0 }}>
                  <Table columns={positionColumns} dataSource={rankData} />
                  <Button style={{ width: "100%" }} type="dashed">
                    + Add Position
                  </Button>
                </Card>
              </Col>

              <Col span={8} offset={16} />
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
