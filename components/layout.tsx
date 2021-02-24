import React from "react"
import styles from "./styles/layout.module.css"

function Layout(props: any) {
  return (
    <div className={styles.container}>
      <main>{props.children}</main>
    </div>
  )
}

export default Layout
