import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { navToggleState } from 'states/music.atom'

import Portal from '../Portal'

import cx from 'classnames'
import styles from './gnb.module.scss'

const GNB = () => {
  const [navToggle, setNavToggle] = useRecoilState(navToggleState)
  const handleNavToggle = () => {
    setNavToggle(false)
  }
  return (
    <Portal>
      <div className={cx(styles.gnb, { [styles.isOpen]: navToggle })}>
        <div className={styles.container}>
          <nav className={styles.menu}>
            <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })} onClick={handleNavToggle}>
              Search
            </NavLink>
            <NavLink
              to='/board'
              className={({ isActive }) => cx({ [styles.isActive]: isActive })}
              onClick={handleNavToggle}
            >
              Board
            </NavLink>
            <NavLink
              to='/upload'
              className={({ isActive }) => cx({ [styles.isActive]: isActive })}
              onClick={handleNavToggle}
            >
              Upload
            </NavLink>
          </nav>
        </div>
      </div>
    </Portal>
  )
}

export default GNB
