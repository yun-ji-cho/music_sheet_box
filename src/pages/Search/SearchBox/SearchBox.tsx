import { ChangeEvent, memo, useEffect, useRef } from 'react'
import { useRecoil } from 'hooks/state'
import cx from 'classnames'

import { SearchIcon, CloseIcon } from 'assets/svg/index'

import styles from './searchBox.module.scss'
import { searchTextState } from 'states/music.atom'

const SearchBox = memo(() => {
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

  useEffect(() => {
    if (searchInput === '') {
      console.log('빈값')
    }
  }, [searchInput])

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
})

SearchBox.displayName = 'SearchBox'

export default SearchBox
