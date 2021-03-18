/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css"
import "antd/dist/antd.css"
import { AppProps } from "next/app"
import React, { useEffect, useState } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { useRouter } from "next/router"
import { Spin } from "antd"
import AppContainer from "../components/app-container"
import NavBar from "../components/navbar"

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setLoading(true)
      console.log(`Loading: ${url}`)
      NProgress.start()
    })
    router.events.on("routeChangeComplete", () => {
      setLoading(false)
      console.log("routeChangeComplete")
      NProgress.done()
    })
    router.events.on("routeChangeError", () => {
      setLoading(false)
      console.log("routeChangeError")
      NProgress.done()
    })
    return () => {}
  })

  return (
    <>
      <Spin size="large" spinning={loading}>
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
