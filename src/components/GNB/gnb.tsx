import {MouseEvent, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { SearchIcon, ListIcon, UploadIcon } from 'assets/svgs/index'

import cx from 'classnames'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <div className={cx(styles.gnb)}>
      <nav className={styles.menu}>
        <NavLink to='/' className={({ isActive }) => cx({[styles.isActive]: isActive })}>
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
