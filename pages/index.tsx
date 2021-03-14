import Head from "next/head"
import React, { useState, useEffect } from "react"
import { Card, Skeleton, Table, Row, Col, Radio, Button } from "antd"
import { ColumnsType } from "antd/es/table"
import { SyncOutlined } from "@ant-design/icons"
import moment from "moment"
import styles from "../styles/Home.module.scss"
import Footer from "../components/footer"
// import Chart from "../components/chart/chart"
import AreaChart from "../components/chart/areaChart"
// import getData from "./api/test"
import { marketNews, companyNews } from "../api/news"
import getAreaChartData from "../api/chart"
import { dayMover } from "../api/stock"

function Home() {
  const [tab, setTab] = useState("general")
  const [loading, setLoading] = useState(false)
  const [dowData, setDow] = useState(null)
  const [spData, setSP] = useState(null)
  const [nasdaqData, setNasdaq] = useState(null)
  const [feedNews, setFeedNews] = useState([])
  const [forexNews, setForexNews] = useState([])
  const [cyptoNews, setCyptoNews] = useState([])
  const [mergeNews, setMergeNews] = useState([])
  const [uNews, setUNews] = useState([])

  const [moverLoading, setMoverLoading] = useState(false)
  const [moverTab, setMoverTab] = useState("gainer")
  const [dayGainer, setGainer] = useState([])
  const [dayLoser, setLoser] = useState([])
  const [mostActive, setActive] = useState([])

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
      const fetchApi = [
        getAreaChartData("DJI", "D", oneYearBefore(), today()),
        getAreaChartData("SPY", "D", oneYearBefore(), today()),
        getAreaChartData("NDX", "D", oneYearBefore(), today()),
        marketNews("general"),
        dayMover(0, 20)
      ]

      const [
        dowResponse,
        spyResponse,
        ndxResponse,
        newsResponse,
        dayMoverRespose
      ]: any = await Promise.all(fetchApi)
      console.log(
        dowResponse,
        spyResponse,
        ndxResponse,
        newsResponse,
        dayMoverRespose
      )
      setDow(dowResponse)
      setSP(spyResponse)
      setNasdaq(ndxResponse)
      setFeedNews(newsResponse)
      // setMover(dayMoverRespose)

      const [gainer, loser, activer] = dayMoverRespose.finance.result
      setGainer(gainer.quotes)
      setLoser(loser.quotes)
      setActive(activer.quotes)
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
    },
    {
      key: "cypto",
      tab: "cypto News"
    },
    {
      key: "merger",
      tab: "Merge News"
    },
    {
      key: "u",
      tab: "Your News"
    }
  ]
  const newColumns: ColumnsType<any> = [
    {
      title: "datetime",
      dataIndex: "datetime",
      key: "datetime",
      render: (dateTime: number) => moment.unix(dateTime).format("YYYY/MM/DD")
    },
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
        columns={newColumns}
        dataSource={feedNews}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    ),
    forex: (
      <Table
        columns={newColumns}
        dataSource={forexNews}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    ),
    cypto: (
      <Table
        columns={newColumns}
        dataSource={cyptoNews}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    ),
    merger: (
      <Table
        columns={newColumns}
        dataSource={mergeNews}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    ),
    u: (
      <Table
        columns={newColumns}
        dataSource={uNews}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    )
  }
  const moverTabList = [
    {
      key: "gainer",
      tab: "Day Gainer"
    },
    {
      key: "loser",
      tab: "Day Loser"
    },
    {
      key: "active",
      tab: "Top Active"
    }
  ]
  const moverColumns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "Change %",
      dataIndex: "DAY_LOSERS",
      key: "DAY_LOSERS"
    },
    {
      title: "Last Price",
      dataIndex: "MOST_ACTIVES",
      key: "MOST_ACTIVES"
    }
  ]
  const moverContent: any = {
    gainer: (
      <Table
        columns={moverColumns}
        dataSource={dayGainer}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    ),
    loser: (
      <Table
        columns={moverColumns}
        dataSource={dayLoser}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    ),
    active: (
      <Table
        columns={moverColumns}
        dataSource={mostActive}
        pagination={{ pageSize: 5, showSizeChanger: false }}
      />
    )
  }

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
  const formatTime = (getTime: number): string => {
    return moment(getTime).format("YYYY-MM-DD")
  }
  //
  const handleResolutionChange = (e: any) => {
    // this.setState({ size: e.target.value });
    console.log(e)
  }
  const onTabChange = async (key: any) => {
    setTab(key)
    setLoading(true)
    let response = null
    if (key === "forex" && !forexNews.length) {
      response = await marketNews(key)
      setForexNews(response)
    } else if (key === "general" && !feedNews.length) {
      response = await marketNews(key)
      setFeedNews(response)
    } else if (key === "cypto" && !cyptoNews.length) {
      response = await marketNews(key)
      setCyptoNews(response)
    } else if (key === "merger" && !mergeNews.length) {
      response = await marketNews(key)
      setMergeNews(response)
    } else if (key === "u" && !uNews.length) {
      const now: number = new Date().getTime() as number
      const preTree: number = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 3
      ).getTime() as number
      const data = [
        companyNews("GOEV", formatTime(preTree), formatTime(now)),
        companyNews("TRIP", formatTime(preTree), formatTime(now)),
        companyNews("AAPL", formatTime(preTree), formatTime(now))
      ]
      response = await Promise.all(data)
      setUNews(response[0].concat(response[1]).concat(response[2]))
    }
    setLoading(false)
  }
  const moverTabChange = (key: string) => {
    setMoverTab(key)
  }
  const updateMover = async () => {
    setMoverLoading(true)
    const dayMoverRespose = await dayMover(0, 20)
    const [gainer, loser, activer] = dayMoverRespose.finance.result
    setGainer(gainer.quotes)
    setLoser(loser.quotes)
    setActive(activer.quotes)
    setMoverLoading(false)
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
                <Card style={{ minWidth: 400 }}>
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
                        <Radio.Button value="1D">1D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">1M</Radio.Button>
                        <Radio.Button value="6M">6M</Radio.Button>
                        <Radio.Button value="6M">ALL</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ minWidth: 400 }}>
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
                        <Radio.Button value="1D">1D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">1M</Radio.Button>
                        <Radio.Button value="6M">6M</Radio.Button>
                        <Radio.Button value="6M">ALL</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ minWidth: 400 }}>
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
                        <Radio.Button value="1D">1D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">1M</Radio.Button>
                        <Radio.Button value="6M">6M</Radio.Button>
                        <Radio.Button value="6M">ALL</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              {/* news */}
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
                  tabBarExtraContent={
                    <Button
                      shape="circle"
                      icon={<SyncOutlined />}
                      onClick={updateMover}
                    />
                  }
                  bodyStyle={{ padding: 12 }}
                  style={{ marginBottom: "8px" }}
                  tabList={moverTabList}
                  activeTabKey={moverTab}
                  onTabChange={(key) => {
                    moverTabChange(key)
                  }}>
                  <Skeleton loading={moverLoading} avatar active>
                    {moverContent[moverTab]}
                  </Skeleton>
                </Card>

                {/* position */}
                <Card bodyStyle={{ padding: 0 }}>
                  <Table columns={positionColumns} dataSource={[]} />
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
