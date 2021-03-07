import Head from "next/head"
import React, { useState, useEffect } from "react"
import { Card, Skeleton, Table, Row, Col, Radio } from "antd"
import { ColumnsType } from "antd/es/table"
import styles from "../styles/Home.module.css"
import Footer from "../components/footer"
// import Chart from "../components/chart/chart"
import AreaChart from "../components/chart/areaChart"
// import getData from "./api/test"
import { generalNews } from "./api/news"
import getAreaChartData from "./api/chart"

function Home() {
  const [noTitleKey, setKey] = useState("Feed")
  const [loading, setLoading] = useState(false)
  const [dowData, setDow]: [any, any] = useState(null)
  const [spData, setSP]: [any, any] = useState(null)
  const [nasdaqData, setNasdaq]: [any, any] = useState(null)
  const [feedNews, setFeedNews]: [any[], any] = useState([])
  // const [news, setNews]: [any, any] = useState(null)
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
      // fetch data
      const dowResponse = await getAreaChartData(
        "DJI",
        "D",
        oneYearBefore(),
        today()
      )
      const spResponse = await getAreaChartData(
        "DJI",
        "D",
        oneYearBefore(),
        today()
      )
      const ndxResponse = await getAreaChartData(
        "NDX",
        "D",
        oneYearBefore(),
        today()
      )
      // const dowResponse = await getData()
      setDow(dowResponse)
      setSP(spResponse)
      setNasdaq(ndxResponse)
      // fetch feed news
      const response = await generalNews("general")
      setFeedNews(response)
      setLoading(false)
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
  const contentListNoTitle: any = {
    Feed: (
      <p>
        <Table
          columns={feedColumns}
          // expandable={{
          //   expandedRowRender: (record: any) => (
          //     <p style={{ margin: 0 }}>{record.summary}</p>
          //   ),
          //   rowExpandable: (record: any) => record.name !== "Not Expandable"
          // }}
          dataSource={feedNews}
          pagination={{ pageSize: 5 }}
        />
      </p>
    ),
    News: <p>News content</p>
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
  const handleSizeChange = (e: any) => {
    // this.setState({ size: e.target.value });
    console.log(e)
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
            {/* area chart */}
            <Row>
              <Col span={8}>
                {dowData && (
                  <div style={{ margin: "10px" }}>
                    <AreaChart
                      data={dowData}
                      type="svg"
                      width={400}
                      height={200}
                      ratio={1}
                    />
                    <Radio.Group
                      onChange={handleSizeChange}
                      className={styles.resolutionBtn}>
                      <Radio.Button value="D">D</Radio.Button>
                      <Radio.Button value="5D">5D</Radio.Button>
                      <Radio.Button value="M">M</Radio.Button>
                    </Radio.Group>
                  </div>
                )}
              </Col>
              <Col span={8}>
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
                      onChange={handleSizeChange}
                      className={styles.resolutionBtn}>
                      <Radio.Button value="D">D</Radio.Button>
                      <Radio.Button value="5D">5D</Radio.Button>
                      <Radio.Button value="M">M</Radio.Button>
                    </Radio.Group>
                  </div>
                )}
              </Col>
              <Col span={8}>
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
                      onChange={handleSizeChange}
                      className={styles.resolutionBtn}>
                      <Radio.Button value="D">D</Radio.Button>
                      <Radio.Button value="5D">5D</Radio.Button>
                      <Radio.Button value="M">M</Radio.Button>
                    </Radio.Group>
                  </div>
                )}
              </Col>
            </Row>
            {/* news */}
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
              {/* popluar ranking */}
              <Col span={8}>
                <Card bodyStyle={{ padding: 0 }}>
                  <Table columns={columns} dataSource={rankData} />
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
