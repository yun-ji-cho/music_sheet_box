import { FormEvent, useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { useRecoilState } from 'recoil'
import {
  searchTextState,
  searchTextFilterState,
  searchMusicCodeState,
  searchCategoryState,
  searchItemVisible,
} from 'states/music.atom'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'
import { useQuery } from 'react-query'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { IResultData } from 'types'

const Search = () => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [matchedData, setMatchedData] = useState<IResultData[] | undefined>([])
  const [searchedWord, setSearchedWord] = useState('')

  const [textFilter, , resetTextFilter] = useRecoil(searchTextFilterState)
  const [searchInput, , resetSearchInput] = useRecoil(searchTextState)
  const [code, , resetSetCode] = useRecoil(searchMusicCodeState)
  const [category, , resetCategory] = useRecoil(searchCategoryState)

  const [filterType, setFilterType] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    resetTextFilter()
    resetSetCode()
    resetCategory()
    resetSearchInput()
    setItemVisible(false)
  }, [resetCategory, resetSearchInput, resetSetCode, resetTextFilter, setItemVisible])

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Search'
  }, [])

  useEffect(() => {
    setFilterType(textFilter.toLowerCase())
    if (textFilter === 'Content') setFilterType('article')
  }, [textFilter])

  useEffect(() => {
    setFilterCode(code)
    if (code === 'ALL') setFilterCode('')
  }, [code])

  useEffect(() => {
    setFilterCategory(category)
    if (category === 'ALL') setFilterCategory('')
  }, [category])

  const { data, refetch, isFetching, isFetched } = useQuery(
    ['musicSheets', searchInput, filterType, filterCode, filterCategory],
    () =>
      getMusicSheetApi({ search: searchInput, filterType, music_code: filterCode, category: filterCategory }).then(
        (res) => res.data
      ),
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      enabled: false,
    }
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchInput) {
      setConfirmModalOpen(true)
      setAlertMessage('검색어를 입력해주세요.')
    }
    refetch()
    setSearchedWord(searchInput)
    setItemVisible(true)
  }

  useEffect(() => {
    if (isFetched && data && searchedWord === searchInput) {
      // console.log('매치 데이터', data.results)
      setMatchedData(data.results)
    }
  }, [data, isFetched, searchInput, searchedWord])

  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <SearchForm />
      </form>
      {itemVisible && matchedData && (
        <SearchResult
          totalLength={matchedData.length}
          filterResult={matchedData}
          title={textFilter}
          searchedWord={searchedWord}
          isFetching={isFetching}
        />
      )}

      {confirmModalOpen && <ConfirmModal message={alertMessage} confirmOnClick={setConfirmModalOpen} />}
    </div>
  )
}

export default Search
