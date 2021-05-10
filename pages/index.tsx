import Head from "next/head"
import React, { useState, useEffect } from "react"
import { Card, Skeleton, Table, Row, Col, Radio, Button } from "antd"
import { ColumnsType } from "antd/es/table"
// import { SyncOutlined } from "@ant-design/icons"
import moment from "moment"
import { useSelector, useDispatch, connect } from "react-redux"
import { GetServerSideProps } from "next"
import styles from "../styles/Home.module.scss"
import Footer from "../components/footer"
// import Chart from "../components/chart/chart"
import AreaChart from "../components/chart/areaChart"
import MoverBlock from "../components/moverBlock"
// import getData from "./api/test"
import { marketNews, companyNews } from "../api/news"
import getAreaChartData from "../api/chart"
import { dayMover, quote } from "../api/stock"
import { State } from "../store"

function Home() {
  // redux state
  const { isSignedIn, currentUser } = useSelector<State, State>(
    (state) => state
  )

  const [tab, setTab] = useState("general")
  const [loading, setLoading] = useState(false)
  const [dowData, setDow] = useState(null)
  const [spData, setSP] = useState(null)
  const [nasdaqData, setNasdaq] = useState(null)

  const [dowBtn, setDowBtn] = useState("1Y")
  const [spBtn, setSpBtn] = useState("1Y")
  const [ndxBtn, setNdxBtn] = useState("1Y")

  const [dowXExtents, setDowXExtents]: [
    [Date, Date] | undefined,
    any
  ] = useState(undefined)
  const [spXExtents, setSpXExtents]: [[Date, Date] | undefined, any] = useState(
    undefined
  )
  const [nasdaqXExtents, setNasdaqXExtents]: [
    [Date, Date] | undefined,
    any
  ] = useState(undefined)

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

  const fetchMover = async (key: string) => {
    let symbols: string[] = []
    console.log(dayGainer, dayLoser, mostActive)
    if (key === "gainer") {
      symbols = dayGainer.map((e: { symbol: string }) => e.symbol)
      const response: any = await quote(symbols)
      dayGainer.forEach((e: any, i: number) => {
        const target = response[i]
        e.change = target.change
        e.lastPrice = target.l
      })
    } else if (key === "loser") {
      symbols = dayLoser.map((e: { symbol: string }) => e.symbol)
      const response: any = await quote(symbols)
      dayLoser.forEach((e: any, i: number) => {
        const target = response[i]
        e.change = target.change
        e.lastPrice = target.l
      })
    } else {
      symbols = mostActive.map((e: { symbol: string }) => e.symbol)
      const response: any = await quote(symbols)
      mostActive.forEach((e: any, i: number) => {
        const target = response[i]
        e.change = target.change
        e.lastPrice = target.l
      })
    }
  }

  const twoYearBefore = () => {
    const Y = new Date().getFullYear()
    const M = new Date().getMonth()
    const D = new Date().getDate()
    return Math.round(new Date(Y - 2, M, D).getTime() / 1000)
  }
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const fetchApi = [
        getAreaChartData("DJI", "D", twoYearBefore(), today()),
        getAreaChartData("SPY", "D", twoYearBefore(), today()),
        getAreaChartData("NDX", "D", twoYearBefore(), today()),
        marketNews("general")
        // dayMover(0, 5)
      ]

      const [
        dowResponse,
        spyResponse,
        ndxResponse,
        newsResponse
      ]: // dayMoverRespose
      any = await Promise.all(fetchApi)

      // console.log(
      //   dowResponse,
      //   spyResponse,
      //   ndxResponse,
      //   newsResponse
      //   // dayMoverRespose
      // )
      setDow(dowResponse)
      setSP(spyResponse)
      setNasdaq(ndxResponse)
      setFeedNews(newsResponse)
      // setMover(dayMoverRespose)
      // const [gainer, loser, activer] = dayMoverRespose.finance.result
      // await setGainer(gainer.quotes)
      // await setLoser(loser.quotes)
      // await setActive(activer.quotes)
      setLoading(false)
    }
    fetchData()
    // quote price
    // return fetchMover(moverTab)
  }, [])

  const formatTime = (getTime: number): string => {
    return moment(getTime).format("YYYY-MM-DD")
  }
  const timeShift = (type: string, offset: number): [Date, Date] => {
    const now = new Date(new Date().setHours(0, 0, 0, 0))
    const nowY = now.getFullYear()
    const nowM = now.getMonth()
    const nowD = now.getDay()

    let from: Date = now
    const to: Date = now
    switch (type) {
      case "D":
        from = new Date(nowY, nowM, nowD - offset, 0, 0, 0)
        break
      case "M":
        from = new Date(nowY, nowM - offset, nowD, 0, 0, 0)
        break
      case "Y":
        from = new Date(nowY - offset, nowM, nowD, 0, 0, 0)
        break
      default:
      // from = undefined
    }
    return [from, to]
  }
  const handleResolutionChange = (e: any) => {
    // console.log(e)
    const btn = e.target.value
    const { name } = e.target

    let xExtents
    if (btn === "1D") {
      xExtents = timeShift("D", 1)
    } else if (btn === "5D") {
      xExtents = timeShift("D", 5)
    } else if (btn === "1M") {
      xExtents = timeShift("M", 1)
    } else if (btn === "1Y") {
      xExtents = timeShift("Y", 1)
    } else if (btn === "ALL") {
      xExtents = undefined
    }
    console.log("xExtents=", xExtents)
    if (name === "dow") {
      setDowBtn(btn)
      setDowXExtents(xExtents)
    } else if (name === "sp") {
      setSpBtn(btn)
      setSpXExtents(xExtents)
    } else if (name === "ndx") {
      setNdxBtn(btn)
      setNasdaqXExtents(xExtents)
    }
  }
  const fetchWatchlistNews = async () => {
    const now: number = new Date().getTime() as number
    const preTreeDay: number = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 3
    ).getTime() as number
    const data = [
      companyNews("GOEV", formatTime(preTreeDay), formatTime(now)),
      companyNews("TRIP", formatTime(preTreeDay), formatTime(now)),
      companyNews("AAPL", formatTime(preTreeDay), formatTime(now))
    ]
    const response = await Promise.all(data)
    setUNews(response[0].concat(response[1]).concat(response[2]))
  }
  const onTabChange = async (key: string) => {
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
    } else if (key === "your" && !uNews.length) {
      fetchWatchlistNews()
    }
    setLoading(false)
  }

  const moverTabChange = async (key: string) => {
    console.log("moverTabChange")
    setMoverLoading(true)
    setMoverTab(key)
    await fetchMover(key)
    setMoverLoading(false)
  }
  const updateMover = async () => {
    setMoverLoading(true)
    const dayMoverRespose = await dayMover(0, 5)
    const [gainer, loser, activer] = dayMoverRespose.finance.result
    setGainer(gainer.quotes)
    setLoser(loser.quotes)
    setActive(activer.quotes)

    fetchMover(moverTab)
    setMoverLoading(false)
    // quote price
    // to do
  }
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
      key: "your",
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
          <a
            href={record.url}
            className={styles.headline}
            target="_blank"
            rel="noreferrer noopener">
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
    your: (
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
      dataIndex: "change",
      key: "change",
      render: (change: number) =>
        change && (
          <span className={change > 0 ? styles.plusChange : styles.minusChange}>
            {change > 0 ? "+ " : "- "}
            {(Math.round(Math.abs(change * 100)) / 100) * 100}%
          </span>
        )
    },
    {
      title: "Last Price",
      dataIndex: "lastPrice",
      key: "lastPrice"
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

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <>
          <h1>
            {isSignedIn ? "Signed in !" : ""}{" "}
            {currentUser && currentUser.displayName}
          </h1>
          <div className={styles.content}>
            {/* area chart */}
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  {dowData && (
                    <div>
                      <AreaChart data={dowData} xExtents={dowXExtents} />
                      <Radio.Group
                        value={dowBtn}
                        name="dow"
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="1D">1D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">1M</Radio.Button>
                        <Radio.Button value="1Y">1Y</Radio.Button>
                        <Radio.Button value="ALL">ALL</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  {spData && (
                    <div>
                      <AreaChart data={spData} xExtents={spXExtents} />
                      <Radio.Group
                        value={spBtn}
                        name="sp"
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="1D">1D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">1M</Radio.Button>
                        <Radio.Button value="1Y">1Y</Radio.Button>
                        <Radio.Button value="ALL">ALL</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  {nasdaqData && (
                    <div>
                      <AreaChart data={nasdaqData} xExtents={nasdaqXExtents} />
                      <Radio.Group
                        value={ndxBtn}
                        name="ndx"
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="1D">1D</Radio.Button>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="M">1M</Radio.Button>
                        <Radio.Button value="1Y">1Y</Radio.Button>
                        <Radio.Button value="ALL">ALL</Radio.Button>
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
                <div className={styles.moverBlock}>
                  <MoverBlock dateRange="1D" />
                </div>
                {/* <Card
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
                </Card> */}

                {/* position */}
                <Card bodyStyle={{ padding: 0 }}>
                  <Table columns={positionColumns} dataSource={[]} />
                  <Button type="dashed">+ Add Position</Button>
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

export default connect((state) => state)(Home)

// Home.getInitialProps = async () => {
//   const response = await getData()
//   return { data: response }
// }

// This gets called on every request

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Fetch data from external API
//   const data = null
//   console.log("getServerSideProps")
//   // Pass data to the page via props
//   return { props: { data } }
// }
