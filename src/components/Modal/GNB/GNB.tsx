import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { navToggleState, searchedWordState, searchRefreshState, searchTextState } from 'states/music.atom'

import Portal from '../Portal'

import cx from 'classnames'
import styles from './gnb.module.scss'
import { useRecoil } from 'hooks/state'

const GNB = () => {
  const [navToggle, setNavToggle] = useRecoilState(navToggleState)
  const [, setSearchRefresh] = useRecoilState(searchRefreshState)
  const [, , resetSearchInput] = useRecoil(searchTextState)
  const [, , resetSearchedWord] = useRecoil(searchedWordState)
  const handleNavToggle = () => {
    setNavToggle(false)
    setSearchRefresh(true)
    resetSearchInput()
    resetSearchedWord()
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
