import { ChangeEvent, FormEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useRecoil } from 'hooks/state'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { confirmModalState, musicCodeState, searchTextState } from 'states/music.atom'
import { IResultData } from 'types'

import styles from './search.module.scss'

import Item from 'components/Item/Item'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import Filter from './Filter/Filter'
import SearchBox from './SearchBox/SearchBox'
import DropDown from 'components/DropDown/DropDown'

const Search = () => {
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState<IResultData[] | []>([])
  const [searchText] = useRecoil(searchTextState)
  const [code] = useRecoil(musicCodeState)

  const [confirmModal, setConfirmModal] = useRecoil(confirmModalState)

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value)
  }

  const { data, refetch } = useQuery(['musicSheets', filter, code, searchText], () =>
    getMusicSheetApi({ filterType: filter, search: searchText, music_code: code }).then((res) => res.data)
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!searchText && !code) setConfirmModal(true)

    if (data) {
      setFiltered(data.results)
    }

    // // const filteredData =
    // console.log(data)
    // refetch()
  }
  const isExist = filtered.length !== data?.count

  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className={styles.line}>
          <Filter handleFilter={handleFilter} />
        </div>
        <div className={styles.line}>
          <DropDown optionValue='musicCode' label='code' />
        </div>
        <div className={styles.line}>
          <SearchBox />
        </div>
      </form>
      {isExist && (
        <ul>
          {filtered.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      )}

      {confirmModal && <ConfirmModal message='검색어를 입력해주세요' />}
    </div>
  )
}

export default Search
