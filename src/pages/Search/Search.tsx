import { MouseEvent, ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { useSearchParams } from 'react-router-dom'
import cx from 'classnames'

import styles from './search.module.scss'
import { SearchIcon, CloseIcon } from 'assets/svgs/index'
// import { getMusicSheetApi } from 'service/getMusicSheetApi'

const codeOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: 'C', label: 'C' },
  { value: 'Db', label: 'Db' },
  { value: 'D', label: 'D'},
  { value: 'E', label: 'E'},
  { value: 'F', label: 'F'},
  { value: 'Gb', label: 'Gb'},
  { value: 'G', label: 'G'},
  { value: 'Ab', label: 'Ab'},
  { value: 'A', label: 'A'},
  { value: 'Bb', label: 'Bb'},
  { value: 'B', label: 'B'},
]

const colourStyles = {
  control: (style: any, { isFocused }: any) => ({
    ...style,
    border: isFocused ? '1px solid #DDCEF5' : '1px solid #ebebeb',
    boxShadow: 'none',
    backgroundColor:'none',
    outline: 'none',
    color: "#ebebeb",
    width: 100,
    
  }),
  option: (style: any, { isFocused }: any) => {
    return {
      ...style,
      backgroundColor: isFocused ? '#DDCEF5' : null,
      color: "#333333",
      width: 100,
    }
  },
  singleValue: (base: any) => ({
    ...base,
    color: "#ebebeb"
  }),
}

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [selectCode, setSelectCode] = useState('ALL')
  const inputEl = useRef<HTMLInputElement>(null)
  
  const handleInputValue = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }
  const handleRemoveValue = () => {
    setSearchText('')
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }
  // const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // setSelectCode(e.value)
  }
  const [searchParams] = useSearchParams()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // const { status, data, error } = useQuery(['musicSheets', filter, code, ], () => getMusicSheetApi({}).then((res) => res.data), {
    //   refetchOnWindowFocus: false, 
    //   retry: 0,
    //   onSuccess: data => {
    //     console.log(data);
    //   },
    //   onError: e => {
    //     console.log(e.message);
    //   }
    // })
  }
  // if (status === 'loading') {
  //   return <span>Loading...</span>;
  // }

  // if (status === 'error') {
  //   return <span>Error: {error.message}</span>;
  // }
  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className={cx(styles.line, styles.filter)}>
          <span>Filter by </span>
          <ul className={styles.selectBox}>
            <li>
              <input type='radio' id='any' name='filter' value='any' defaultChecked />
              <label htmlFor='any'>Any</label>
            </li>
            <li>
              <input type='radio' id='title' value='title' name='filter' />
              <label htmlFor='title'>Title</label>
            </li>
            <li>
              <input type='radio' id='Content' value='Content' name='filter' />
              <label htmlFor='Content'>Content</label>
            </li>
          </ul>
        </div>
        <div className={cx(styles.line, styles.dropDown)}>
          <label htmlFor='selectCode'>Code </label>
          <div className={styles.select}>
            <Select 
              defaultValue={codeOptions[0]}
              options={codeOptions}
              styles={colourStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
              })}
              onChange={handleSelectChange}
            />
          </div>
        </div>
        <div className={styles.line}>
          <div className={styles.searchBox}>
            <input type='text' placeholder='Search...' onChange={handleInputValue} value={searchText} ref={inputEl}/>
            <button type='button' aria-label='삭제' className={cx(styles.deleteBtn, { [styles.isActive]: searchText })} onClick={handleRemoveValue}><CloseIcon className={styles.removeIcon} /></button>
            <button type='submit' aria-label='검색' className={styles.searchBtn}><SearchIcon className={styles.searchIcon}/></button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search

