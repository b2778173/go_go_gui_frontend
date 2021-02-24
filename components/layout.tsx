import React, { ReactNode } from "react"
import styles from "./styles/layout.module.css"

function Layout(props: { children: ReactNode }) {
  const { children } = props

  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  )
}

export default Layout
