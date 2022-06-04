import { ChangeEvent, FormEvent, useState, useRef } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import Select from 'react-select'
import cx from 'classnames'

import { SearchIcon, CloseIcon } from 'assets/svgs/index'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { confirmModalState } from 'recoil/music.atom'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import Item from 'pages/Board/Item/Item'
import { IResultData } from 'types'

import styles from './search.module.scss'

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
  const [filter, setFilter] = useState('')
  const [code, setCode] = useState('')
  const [searchText, setSearchText] = useState('')
  const inputEl = useRef<HTMLInputElement>(null)
  const [filtered, setFiltered] = useState<IResultData[] | []>([])

  const [confirmModal, setConfirmModal] = useRecoilState<Boolean>(confirmModalState)

  const handleFilter = (e:ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value)
  }
  
  const handleInputValue = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }
  const handleRemoveValue = () => {
    setSearchText('')
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }
  const handleSelectChange = (e: any) => {
    setCode(e.value)
  }

  const { data, refetch } = useQuery(['musicSheets', filter, code, searchText], 
  () => getMusicSheetApi({filterType: filter, search:searchText, music_code:code })
  .then((res) => res.data)
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(!searchText && !code) setConfirmModal(true)
    

    if(data){
      setFiltered(data.results)
      console.log(data.results)
    }

    
    // // const filteredData = 
    // console.log(data)
    // refetch()
  }

  console.log(filtered, data?.count)


  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className={cx(styles.line, styles.filter)}>
          <span>Filter by </span>
          <ul className={styles.selectBox}>
            <li>
              <input type='radio' id='any' name='filter' value='any' defaultChecked onChange={handleFilter}/>
              <label htmlFor='any'>Any</label>
            </li>
            <li>
              <input type='radio' id='title' value='title' name='filter' onChange={handleFilter}/>
              <label htmlFor='title'>Title</label>
            </li>
            <li>
              <input type='radio' id='Content' value='Content' name='filter' onChange={handleFilter}/>
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
      {data && filtered.length !== data.count ? (
        <ul>
          {filtered.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        null
      )}

      {confirmModal && <ConfirmModal message='검색어를 입력해주세요' />}

    </div>
  )
}

export default Search

