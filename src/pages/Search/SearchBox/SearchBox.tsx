import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRecoil, useRecoilState } from 'hooks/state'
import cx from 'classnames'

import { SearchIcon, CloseIcon } from 'assets/svg/index'

import styles from './searchBox.module.scss'
import { searchItemVisible, searchTextState } from 'states/music.atom'
import { useDebounce } from 'hooks/index'

const SearchBox = () => {
  const [, setItemVisible] = useRecoilState(searchItemVisible)
  const [localInput, setLocalInput] = useState('')
  const [searchInput, setSearchInput] = useRecoil(searchTextState)
  const inputEl = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(localInput, 500)

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalInput(event.target.value)
  }

  useEffect(() => {
    setSearchInput(localInput)
  }, [debouncedValue])

  const handleRemoveValue = () => {
    setLocalInput('')
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
      <input type='text' placeholder='Search...' onChange={handleInputValue} value={localInput} ref={inputEl} />
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
