import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import Search from '../pages/Search/Search'
import Board from '../pages/Board/Board'
import Upload from '../pages/Upload/Upload'
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import GNB from '../components/Modal/GNB/GNB'

import { navToggleState } from 'states/music.atom'

const App = () => {
  const navToggle = useRecoilValue(navToggleState)
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        {navToggle && <GNB />}
        <Routes>
          <Route path='' element={<Search />} />
          <Route path='/' element={<Layout />}>
            <Route path='board' element={<Board />} />
            <Route path='upload' element={<Upload />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
