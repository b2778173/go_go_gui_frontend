import '../styles/globals.css'
import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import AppContainer from '../components/app-container'
import NavBar from '../components/navbar'
import { Fragment } from 'react'
import Chart from '../components/chart'

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <NavBar></NavBar>
      <Chart></Chart>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </Fragment>
  )
}

export default App
