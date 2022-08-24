import { FormEvent, useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { useRecoilState } from 'recoil'
import { useQuery } from 'react-query'
import {
  searchTextState,
  searchTextFilterState,
  searchMusicCodeState,
  searchCategoryState,
  searchItemVisible,
  searchedWordState,
  searchRefreshState,
} from 'states/music.atom'

import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { IResultData } from 'types'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'

const Search = () => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [matchedData, setMatchedData] = useState<IResultData[] | undefined>([])
  const [searchedWord, setSearchedWord, resetSearchedWord] = useRecoil(searchedWordState)

  const [textFilter, , resetTextFilter] = useRecoil(searchTextFilterState)
  const [searchInput, setSearchInput, resetSearchInput] = useRecoil(searchTextState)
  const [code, , resetSetCode] = useRecoil(searchMusicCodeState)
  const [category, , resetCategory] = useRecoil(searchCategoryState)
  const [isRefreshPage] = useRecoil(searchRefreshState)

  const [filterType, setFilterType] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    if (!isRefreshPage) {
      setSearchInput(searchedWord)
      return
    }
    resetTextFilter()
    resetSetCode()
    resetCategory()
    resetSearchInput()
    resetSearchedWord()
    setItemVisible(false)
  }, [
    isRefreshPage,
    resetCategory,
    resetSearchInput,
    resetSearchedWord,
    resetSetCode,
    resetTextFilter,
    searchedWord,
    setItemVisible,
    setSearchInput,
  ])

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
      return
    }
    refetch()
    setSearchedWord(searchInput)
    setItemVisible(true)
  }

  useEffect(() => {
    if (isFetched && data && searchedWord === searchInput) {
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
          isFetching={isFetching}
        />
      )}

      {confirmModalOpen && <ConfirmModal message={alertMessage} confirmOnClick={setConfirmModalOpen} />}
    </div>
  )
}

export default Search
