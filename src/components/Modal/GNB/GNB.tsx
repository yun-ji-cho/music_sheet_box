import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import { Nav } from 'types'

import styles from './gnb.module.scss'

import Portal from '../Portal'

interface Props extends Nav {
  refetch: () => {}
  handleResetForm: () => {}
}

const GNB = memo(({ refetch, handleResetForm, navToggle, setNavToggle }: Props) => {
  const handleNavToggle = () => {
    setNavToggle(false)
    refetch()
    handleResetForm()
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
})

GNB.displayName = 'GNB'
export default GNB
