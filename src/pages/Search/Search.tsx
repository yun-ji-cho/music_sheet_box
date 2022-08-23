import { FormEvent, useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { useRecoilState, useRecoilValue } from 'recoil'
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
import Loading from 'components/Loading/Loading'
import { useQuery } from 'react-query'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { IResultData } from 'types'

const Search = () => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [matchedData, setMatchedData] = useState<IResultData[] | undefined>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const [textFilter] = useRecoil(searchTextFilterState)
  const [searchText] = useRecoil(searchTextState)
  const code = useRecoilValue(searchMusicCodeState)
  const category = useRecoilValue(searchCategoryState)

  const [filterType, setFilterType] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

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

  const { data, refetch } = useQuery(
    ['musicSheets', searchText, filterType, filterCode, filterCategory],
    () =>
      getMusicSheetApi({ search: searchText, filterType, music_code: filterCode, category: filterCategory }).then(
        (res) => res.data
      ),
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      enabled: false,
    }
  )

  useEffect(() => {
    console.log(data)
    refetch()
  }, [data, refetch, searchText])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchText) {
      setConfirmModalOpen(true)
      setAlertMessage('검색어를 입력해주세요.')
      return
    }
    refetch()

    if (data) {
      setSearchLoading(true)
      setItemVisible(false)
      setMatchedData(data.results)
      setTimeout(() => {
        setSearchLoading(false)
        setItemVisible(true)
      }, 300)
    }
  }

  return (
    <div className={styles.search}>
      {searchLoading && <Loading />}
      <h2>Find Your Music Sheet</h2>
      <SearchForm handleSubmit={handleSubmit} refetch={refetch} />
      {itemVisible && matchedData && (
        <SearchResult totalLength={matchedData.length} filterResult={matchedData} title={textFilter} />
      )}

      {confirmModalOpen && <ConfirmModal message={alertMessage} confirmOnClick={setConfirmModalOpen} />}
    </div>
  )
}

export default Search
