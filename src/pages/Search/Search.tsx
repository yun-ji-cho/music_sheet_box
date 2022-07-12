import { FormEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useRecoil } from 'hooks/state'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import {
  confirmModalState,
  filterModalState,
  searchCategoryState,
  searchMusicCodeState,
  searchTextFilterState,
  searchTextState,
} from 'states/music.atom'
import { IResultData } from 'types'

import styles from './search.module.scss'

import Item from 'components/Item/Item'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchBox from './SearchBox/SearchBox'
import { FilterIcon } from 'assets/svg'
import FilterModal from './FilterModal/FilterModal'
import Tag from './Tag/Tag'

const Search = () => {
  const [filter] = useState('')
  const [filtered, setFiltered] = useState<IResultData[] | []>([])
  const [searchText] = useRecoil(searchTextState)
  const [textFilter] = useRecoil(searchTextFilterState)
  const [code] = useRecoil(searchMusicCodeState)
  const [category] = useRecoil(searchCategoryState)
  const [, setFilterModal] = useRecoil(filterModalState)

  const [confirmModal, setConfirmModal] = useRecoil(confirmModalState)

  const { data } = useQuery(['musicSheetsSearch', filter, code, searchText], () =>
    getMusicSheetApi({ filterType: filter, search: searchText, music_code: code }).then((res) => res.data)
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchText && !code) setConfirmModal(true)

    if (data) {
      setFiltered(data.results)
    }
  }
  const isExist = filtered.length !== data?.count

  const handleFilterModal = () => {
    setFilterModal((prev) => !prev)
  }

  const tagArr = [
    { title: 'textFilter', value: textFilter },
    { title: 'code', value: code },
    { title: 'category', value: category },
  ]

  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className={styles.searchWrap}>
          <SearchBox />
          <button type='button' className={styles.filterBtn} onClick={handleFilterModal}>
            <FilterIcon className={styles.filterIcon} />
          </button>
        </div>
        <ul className={styles.tagWrap}>
          {tagArr.map((item) => (
            <Tag key={item.title} title={item.title} value={item.value} />
          ))}
        </ul>
        <FilterModal />
      </form>
      {isExist && (
        <ul>
          {filtered.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      )}

      {confirmModal && <ConfirmModal message='검색어를 입력해주세요' />}
    </div>
  )
}

export default Search
