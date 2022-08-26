import { FormEvent, useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { useQuery } from 'react-query'
import {
  searchTextState,
  searchTextFilterState,
  searchMusicCodeState,
  searchCategoryState,
  searchItemVisible,
  searchedWordState,
  searchRefreshState,
  inputBlurState,
  matchedDataState,
  searchRefetchState,
} from 'states/music.atom'

import { getMusicSheetApi } from 'service/getMusicSheetApi'
// import { IResultData } from 'types'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'

const Search = () => {
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [matchedData, setMatchedData] = useRecoil(matchedDataState)
  const [filterType, setFilterType] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const [searchedWord, setSearchedWord, resetSearchedWord] = useRecoil(searchedWordState)
  const [itemVisible, setItemVisible] = useRecoil(searchItemVisible)
  const [textFilter, , resetTextFilter] = useRecoil(searchTextFilterState)
  const [searchInput] = useRecoil(searchTextState)
  const [code, , resetSetCode] = useRecoil(searchMusicCodeState)
  const [category, , resetCategory] = useRecoil(searchCategoryState)
  const [isRefreshPage] = useRecoil(searchRefreshState)
  const [inputBlur, setInputBlur] = useRecoil(inputBlurState)
  const [searchRefetch, setSearchRefetch] = useRecoil(searchRefetchState)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Search'
  }, [])

  const { data, refetch, isFetching } = useQuery(
    ['musicSheets', searchInput, filterType, filterCode, filterCategory],
    () =>
      getMusicSheetApi({
        search: searchInput,
        filterType: textFilter,
        music_code: filterCode,
        category: filterCategory,
      }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      enabled: false,
    }
  )

  useEffect(() => {
    if (searchRefetch && data) {
      refetch()
      setMatchedData(data.results)
    }
  }, [data, matchedData, refetch, searchRefetch, setMatchedData, setSearchRefetch])

  useEffect(() => {
    setSearchRefetch(false)
  }, [matchedData, setSearchRefetch])

  useEffect(() => {
    setFilterType(textFilter.toLowerCase())
  }, [textFilter])

  useEffect(() => {
    setFilterCode(code)
    if (code === 'ALL') setFilterCode('')
  }, [code])

  useEffect(() => {
    setFilterCategory(category)
    if (category === 'ALL') setFilterCategory('')
  }, [category])

  useEffect(() => {
    if (data && searchedWord === searchInput && inputBlur) {
      setMatchedData(data.results)
    }
  }, [data, inputBlur, matchedData, searchInput, searchedWord, setMatchedData])

  useEffect(() => {
    if (isRefreshPage && !searchInput && !searchedWord) {
      resetTextFilter()
      resetSetCode()
      resetCategory()
      resetSearchedWord()
      setItemVisible(false)
    }
  }, [
    isRefreshPage,
    resetCategory,
    resetSearchedWord,
    resetSetCode,
    resetTextFilter,
    searchInput,
    searchedWord,
    setItemVisible,
  ])

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
    setInputBlur(true)
  }

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

      {confirmModalOpen && <ConfirmModal message={alertMessage} confirmButtonFunc={setConfirmModalOpen} />}
    </div>
  )
}

export default Search
