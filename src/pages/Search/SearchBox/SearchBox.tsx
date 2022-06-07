import { ChangeEvent, useRef } from 'react'
import { useRecoil } from 'hooks/state'
import cx from 'classnames'

import { SearchIcon, CloseIcon } from 'assets/svgs/index'

import styles from './searchBox.module.scss'
import { searchTextState } from 'states/music.atom'

const SearchBox = () => {
  const [searchInput, setSearchInput, resetSearchText] = useRecoil(searchTextState)
  const inputEl = useRef<HTMLInputElement>(null)
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value)
  }
  const handleRemoveValue = () => {
    resetSearchText()
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }

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
