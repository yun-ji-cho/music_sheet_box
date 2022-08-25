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
} from 'states/music.atom'

import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { IResultData } from 'types'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'

const Search = () => {
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [matchedData, setMatchedData] = useState<IResultData[] | undefined>([])
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

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Search'
  }, [])

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

  const { data, refetch, isFetching, isFetched } = useQuery(
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
    if (searchInput !== searchedWord) return
    refetch()
  }, [data, refetch, searchInput, searchedWord])

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
    setItemVisible(true)
    setSearchedWord(searchInput)
  }

  useEffect(() => {
    if (isFetched && data && searchedWord === searchInput) {
      setMatchedData(data.results)
    }
  }, [data, isFetched, matchedData, searchInput, searchedWord])

  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <SearchForm />
      </form>
      {itemVisible && matchedData && matchedData.length > 0 && (
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
