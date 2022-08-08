import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

// import { SearchIcon, ListIcon, UploadIcon } from 'assets/svg/index'
import { navToggleState } from 'states/music.atom'

import Potal from '../Potal'

import cx from 'classnames'
import styles from './gnb.module.scss'

const GNB = () => {
  const navToggle = useRecoilValue(navToggleState)
  return (
    <Potal>
      <div className={cx(styles.gnb, { [styles.isOpen]: navToggle })}>
        <div className={styles.container}>
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
      </div>
    </Potal>
  )
}

export default GNB
