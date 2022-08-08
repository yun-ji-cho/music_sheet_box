import { NavLink } from 'react-router-dom'

// import { SearchIcon, ListIcon, UploadIcon } from 'assets/svg/index'

import Potal from '../Potal'

import cx from 'classnames'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <Potal>
      <div className={styles.gnb}>
        <nav className={styles.menu}>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            Search
          </NavLink>
          <NavLink to='/board' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            Board
          </NavLink>
          <NavLink to='/upload' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            Upload
          </NavLink>
        </nav>
      </div>
    </Potal>
  )
}

export default GNB
