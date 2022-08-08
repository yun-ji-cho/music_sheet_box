import { useRecoilState } from 'recoil'
import { NavLink } from 'react-router-dom'
import { SaveBoxIcon } from 'assets/svg/index'

import styles from './header.module.scss'

import { navToggleState } from 'states/music.atom'

const Header = () => {
  const [, setNavToggle] = useRecoilState(navToggleState)

  const handleNavToggle = () => {
    setNavToggle((prev) => !prev)
  }
  return (
    <header className={styles.header}>
      <h1>
        <NavLink to='/' className={styles.logo}>
          <SaveBoxIcon className={styles.logoIcon} />
          Music sheet box
        </NavLink>
      </h1>
      <button type='button' className={styles.menuBtn} onClick={handleNavToggle}>
        <span className={styles.blind}>menu open</span>
      </button>
    </header>
  )
}

export default Header
