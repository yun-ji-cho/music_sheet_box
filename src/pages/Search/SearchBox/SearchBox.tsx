import { ChangeEvent, useEffect, useRef } from 'react'
import { useRecoil, useRecoilState } from 'hooks/state'
import cx from 'classnames'

import { SearchIcon, CloseIcon } from 'assets/svg/index'

import styles from './searchBox.module.scss'
import { searchItemVisible, searchTextState } from 'states/music.atom'

const SearchBox = () => {
  const [, setItemVisible] = useRecoilState(searchItemVisible)
  const [searchInput, setSearchInput, resetSearchText] = useRecoil(searchTextState)
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    resetSearchText()
  }, [resetSearchText])

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value)
  }
  const handleRemoveValue = () => {
    resetSearchText()
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }

  useEffect(() => {
    if (searchInput === '') {
      setItemVisible(false)
    }
  }, [searchInput, setItemVisible])

  return (
    <div className={styles.searchBox}>
      <input type='text' placeholder='Search...' onChange={handleInputValue} value={searchInput} ref={inputEl} />
      <button
        type='button'
        aria-label='삭제'
        className={cx(styles.deleteBtn, { [styles.isActive]: searchInput })}
        onClick={handleRemoveValue}
      >
        <CloseIcon className={styles.removeIcon} />
      </button>
      <button type='submit' aria-label='검색' className={styles.searchBtn}>
        <SearchIcon className={styles.searchIcon} />
      </button>
    </div>
  )
}

export default SearchBox
