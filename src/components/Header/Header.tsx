import { NavLink } from 'react-router-dom'
import { SaveBoxIcon } from 'assets/svg/index'

import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <NavLink to='/' className={styles.logo}>
          <SaveBoxIcon className={styles.logoIcon} />
          Music sheet box
        </NavLink>
      </h1>
    </header>
  )
}

export default Header
