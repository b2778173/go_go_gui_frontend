/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css"
import "antd/dist/antd.css"
import { AppProps } from "next/app"
import React, { Fragment } from "react"
import AppContainer from "../components/app-container"
import NavBar from "../components/navbar"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </>
  )
}

export default App
