import { NavLink } from 'react-router-dom'

import { SearchIcon, ListIcon, UploadIcon } from 'assets/svg/index'

import cx from 'classnames'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <div className={styles.gnb}>
      <nav className={styles.menu}>
        <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          <span>
            <SearchIcon />
          </span>
        </NavLink>
        <NavLink to='/board' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          <span>
            <ListIcon />
          </span>
        </NavLink>
        <NavLink to='/upload' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          <span>
            <UploadIcon />
          </span>
        </NavLink>
      </nav>
    </div>
  )
}

export default GNB
