import { Outlet } from 'react-router-dom'

import styles from './pageLayout.module.scss'

const PageLayout = () => {
  return (
    <main className={styles.pageLayout}>
      <Outlet />
    </main>
  )
}

export default PageLayout
