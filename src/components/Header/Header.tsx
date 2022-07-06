import { NavLink } from 'react-router-dom'
import { SaveBoxIcon, EnvelopeIcon, ShareIcon } from 'assets/svg/index'

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
      <div className={styles.userOption}>
        <button type='button' aria-label='메세지'>
          <EnvelopeIcon className={styles.icon} />
        </button>
        <button type='button' aria-label='공유'>
          <ShareIcon className={styles.icon} />
        </button>
      </div>
    </header>
  )
}

export default Header
