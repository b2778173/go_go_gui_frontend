/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css"
import "antd/dist/antd.css"
import { AppProps } from "next/app"
import React, { useState } from "react"
import NProgress from "nprogress"
import Router from "next/router"
import Head from "next/head"
import { Spin } from "antd"
import AppContainer from "../components/app-container"
import NavBar from "../components/navbar"

// import Chart from "../components/chart"
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())
function App({ Component, pageProps }: AppProps) {
  const [loading] = useState(false)
  return (
    <>
      <Spin size="large" spinning={loading}>
        <Head>
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
        <nav>
          {/* <Chart /> */}
          <NavBar showTickerTap />
          <AppContainer>
            <Component {...pageProps} />
          </AppContainer>
        </nav>
      </Spin>
    </>
  )
}

export default App
