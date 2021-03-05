import '../styles/globals.css'
import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import AppContainer from '../components/app-container'
import NavBar from '../components/navbar'
import { Fragment } from 'react'

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <NavBar></NavBar>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </Fragment>
  )
}

export default App
