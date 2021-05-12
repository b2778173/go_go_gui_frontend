/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css"
import "antd/dist/antd.css"
import { AppProps } from "next/app"
import React, { useEffect, useState } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { useRouter } from "next/router"
import { Spin } from "antd"
import { PersistGate } from "redux-persist/integration/react"
// import { useStore } from "react-redux"
import { useStore } from "react-redux"
import AppContainer from "../components/app-container"
import NavBar from "../components/navbar"
import { wrapper } from "../store"

function WrappedApp({ Component, pageProps }: AppProps) {
  const store: any = useStore()

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true)
      // console.log(`Loading: ${url}`)
      NProgress.start()
    })
    router.events.on("routeChangeComplete", () => {
      setLoading(false)
      // console.log("routeChangeComplete")
      NProgress.done()
    })
    router.events.on("routeChangeError", () => {
      setLoading(false)
      // console.log("routeChangeError")
      NProgress.done()
    })
    return () => {}
  })

  return (
    <PersistGate
      persistor={store.__persistor}
      loading={
        <div className="example">
          <Spin tip="presisting..." />
        </div>
      }>
      <Spin size="large" spinning={loading}>
        <nav>
          {/* <Chart /> */}
          <NavBar showTickerTap />
          <AppContainer>
            <Component {...pageProps} />
          </AppContainer>
        </nav>
      </Spin>
    </PersistGate>
  )
}

export default wrapper.withRedux(WrappedApp)
