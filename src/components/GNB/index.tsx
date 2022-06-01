import { NavLink } from 'react-router-dom'
import { SearchIcon, ListIcon, UploadIcon } from '../../assets/svgs/index'

import { cx } from '../../styles'
import styles from './GNB.module.scss'

const GNB = () => {
  return (
    <div className={styles.gnb}>
      <nav className={styles.menu}>
        <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          <SearchIcon />
        </NavLink>
        <NavLink to='/board' className={({ isActive }) => cx(styles.icon, { [styles.isActive]: isActive })}>
          <ListIcon />
        </NavLink>
        <NavLink to='/upload' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          <UploadIcon />
        </NavLink>
      </nav>
    </div>
  )
}

export default GNB
