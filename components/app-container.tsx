import Head from "next/head"
import React, { ReactNode } from "react"
import styles from "./styles/app-container.module.css"

function AppContainer(props: { children: ReactNode }) {
  const { children } = props
  return (
    <div className={styles.container}>
      <Head>
        <title>股咕雞</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </div>
  )
}

export default AppContainer
