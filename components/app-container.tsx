import Head from 'next/head'
import styles from './styles/app-container.module.css'

function AppContainer(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>股咕雞</title>
      </Head>
      <main>{props.children}</main>
    </div>
  )
}

export default AppContainer
