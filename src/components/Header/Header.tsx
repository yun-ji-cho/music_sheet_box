import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import { SaveBoxIcon } from 'assets/svg/index'

import styles from './header.module.scss'
import { Nav } from 'types'

const Header = memo(({ navToggle, setNavToggle }: Nav) => {
  const handleNavToggle = () => {
    setNavToggle((prev) => !prev)
  }
  return (
    <header className={styles.header}>
      <h1>
        <NavLink to='/' className={styles.logo}>
          <SaveBoxIcon className={styles.logoIcon} />
          Sheet Music Box
        </NavLink>
      </h1>
      <button type='button' className={cx(styles.menuBtn, { [styles.isOpen]: navToggle })} onClick={handleNavToggle}>
        <span className={styles.blind}>menu open</span>
      </button>
    </header>
  )
})

Header.displayName = 'Header'

export default Header
