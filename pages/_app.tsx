/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css"
import "antd/dist/antd.css"
import { AppProps } from "next/app"
import React from "react"
import AppContainer from "../components/app-container"
import NavBar from "../components/navbar"
import Chart from "../components/chart"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Chart />
      <NavBar showTickerTap />
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </>
  )
}

export default App
