import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import Search from '../pages/Search/Search'
import Board from '../pages/Board/Board'
import GNB from '../components/GNB'

const App = () => {
  return (
    <div className={styles.appWrap}>
      <GNB />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/' element={<Board />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
