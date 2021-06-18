import React, { useState, useEffect } from "react"
import { Card, Skeleton, Table, Row, Col, Radio, Button } from "antd"
import { ColumnsType } from "antd/es/table"
// import { SyncOutlined } from "@ant-design/icons"
import moment from "moment"
import { useSelector, connect } from "react-redux"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import styles from "../styles/Home.module.scss"
// import Footer from "../components/footer"
// import Chart from "../components/chart/chart"
import AreaChart from "../components/chart/areaChart"
import MoverBlock from "../components/moverBlock"
// import getData from "./api/test"
import { marketNews, companyNews } from "../api/news"
import getAreaChartData from "../api/chart"
import { State } from "../store"
import { UserState } from "../store/reducer/user"

function Home({
  dowData,
  spData,
  nasdaqData,
  feedNews
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log(dowData, spData, nasdaqData, feedNews)
  // redux state
  const { isSignedIn, currentUser } = useSelector<State, UserState>(
    (state) => state.user
  )

  const [tab, setTab] = useState("general")
  const [loading, setLoading] = useState(false)
  // const [dowData, setDow] = useState(null)
  // const [spData, setSP] = useState(null)
  // const [nasdaqData, setNasdaq] = useState(null)

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

  // const [feedNews, setFeedNews] = useState(feedNewsFromProps)
  const [forexNews, setForexNews] = useState([])
  const [cyptoNews, setCyptoNews] = useState([])
  const [mergeNews, setMergeNews] = useState([])
  const [uNews, setUNews] = useState([])

  useEffect(() => {}, [])

  const formatTime = (getTime: number): string => {
    return moment(getTime).format("YYYY-MM-DD")
  }
  const timeShift = (data: any, type: string, offset: number): [Date, Date] => {
    console.log(data, type, offset)
    const now = new Date(new Date().setHours(0, 0, 0, 0))

    const dateArray = data.map((d: any) => d.date)
    const to: Date = new Date(Math.max(...dateArray))
    const toY = to.getFullYear()
    const toM = to.getMonth()
    const toD = to.getDate()

    let from: Date
    if (to.getTime() < now.getTime()) {
      from = new Date(to.setHours(0, 0, 0, 0))
    } else {
      from = now
    }

    switch (type) {
      case "D":
        from = new Date(toY, toM, toD - offset, 0, 0, 0)
        break
      case "M":
        from = new Date(toY, toM - offset, toD, 0, 0, 0)
        break
      case "Y":
        from = new Date(toY - offset, toM, toD, 0, 0, 0)
        break
      default:
      // from = undefined
    }
    return [from, to]
  }
  const handleResolutionChange = (e: any) => {
    // console.log(e.target.value)
    const btn = e.target.value
    const { name } = e.target
    let data = null
    if (name === "dow") {
      data = dowData
    } else if (name === "sp") {
      data = spData
    } else if (name === "ndx") {
      data = nasdaqData
    }

    let xExtents
    if (btn === "5D") {
      xExtents = timeShift(data, "D", 5)
    } else if (btn === "1M") {
      xExtents = timeShift(data, "M", 1)
    } else if (btn === "6M") {
      xExtents = timeShift(data, "M", 6)
    } else if (btn === "1Y") {
      xExtents = timeShift(data, "Y", 1)
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
                <Card className={styles.newsCard}>
                  {dowData && (
                    <div>
                      <AreaChart data={dowData} xExtents={dowXExtents} />
                      <Radio.Group
                        value={dowBtn}
                        name="dow"
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="1M">1M</Radio.Button>
                        <Radio.Button value="6M">6M</Radio.Button>
                        <Radio.Button value="1Y">1Y</Radio.Button>
                        <Radio.Button value="ALL">ALL</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8}>
                <Card className={styles.newsCard}>
                  {spData && (
                    <div>
                      <AreaChart data={spData} xExtents={spXExtents} />
                      <Radio.Group
                        value={spBtn}
                        name="sp"
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="1M">1M</Radio.Button>
                        <Radio.Button value="6M">6M</Radio.Button>
                        <Radio.Button value="1Y">1Y</Radio.Button>
                        <Radio.Button value="ALL">ALL</Radio.Button>
                      </Radio.Group>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={8} className={styles.newsCard}>
                <Card>
                  {nasdaqData && (
                    <div>
                      <AreaChart data={nasdaqData} xExtents={nasdaqXExtents} />
                      <Radio.Group
                        value={ndxBtn}
                        name="ndx"
                        onChange={handleResolutionChange}
                        className={styles.resolutionBtn}>
                        <Radio.Button value="5D">5D</Radio.Button>
                        <Radio.Button value="1M">1M</Radio.Button>
                        <Radio.Button value="6M">6M</Radio.Button>
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
                  <MoverBlock dateRange="6M" />
                </div>

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
      {/* <Footer /> */}
    </div>
  )
}

export default connect((state) => state)(Home)

export const getStaticProps: GetStaticProps = async () => {
  const fiveYearAgo = () => {
    const Y = new Date().getFullYear()
    const M = new Date().getMonth()
    const D = new Date().getDate()
    return Math.round(new Date(Y - 5, M, D).getTime() / 1000)
  }
  const today = () => {
    return Math.round(new Date().getTime() / 1000)
  }

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // console.log(fiveYearAgo(), today())
  const fetchApi = [
    getAreaChartData("DJI", "D", fiveYearAgo(), today()),
    getAreaChartData("SPY", "D", fiveYearAgo(), today()),
    getAreaChartData("NDX", "D", fiveYearAgo(), today()),
    marketNews("general")
    // dayMover(0, 5)
  ]
  const [dowData, spData, nasdaqData, feedNews] = await Promise.all(fetchApi)
  return {
    props: {
      dowData,
      spData,
      nasdaqData,
      feedNews
    }
  }
}
