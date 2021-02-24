import Head from "next/head"
import React from "react"
import styles from "./styles/app-container.module.css"

function AppContainer(props: any) {
  const { children } = props
  return (
    <div className={styles.container}>
      <Head>
        <title>股咕雞</title>
      </Head>
      <main>{children}</main>
    </div>
  )
}

export default AppContainer
