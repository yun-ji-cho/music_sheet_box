import { FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  searchTextState,
  searchTextFilterState,
  searchMusicCodeState,
  searchCategoryState,
  searchItemVisible,
} from 'states/music.atom'
import { IResultData, IMusicSheetRes } from 'types'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'
import Loading from 'components/Loading/Loading'
import { useQuery } from 'react-query'
import { getMusicSheetApi } from 'service/getMusicSheetApi'

const Search = () => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [filterTitle, setFilterTitle] = useState<IResultData[] | undefined>([])
  const [filterContent, setFilterContent] = useState<IResultData[] | undefined>([])
  const [totalLength, setTotalLength] = useState(0)
  const [search, setSearch] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [filterType, setFilterType] = useState('')

  const [textFilter] = useRecoil(searchTextFilterState)
  const [searchText] = useRecoil(searchTextState)
  const code = useRecoilValue(searchMusicCodeState)
  const category = useRecoilValue(searchCategoryState)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Search'
  }, [])

  useEffect(() => {
    if (textFilter === 'Any') setFilterType('')
    if (textFilter === 'Title') setFilterType('title')
    if (textFilter === 'Article') setFilterType('article')
  }, [textFilter])

  useEffect(() => {
    let titleDataLength = 0
    let contentDataLength = 0

    if (filterTitle) titleDataLength = filterTitle.length
    if (filterContent) contentDataLength = filterContent.length

    setTotalLength(titleDataLength + contentDataLength)
  }, [filterTitle, filterContent])

  const { data, refetch } = useQuery(
    ['musicSheets', searchText, textFilter, code, category],
    () => getMusicSheetApi({ filterType, search: searchText, music_code: code, category }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    }
  )

  useEffect(() => {
    console.log(data)
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchText) {
      setConfirmModalOpen(true)
      setAlertMessage('검색어를 입력해주세요.')
    } else {
      setSearch(true)
      setItemVisible(false)
      setTimeout(() => {
        setSearch(false)
        refetch()
        setItemVisible(true)
      }, 500)
    }
  }

  return (
    <div className={styles.search}>
      {search && <Loading />}
      <h2>Find Your Music Sheet</h2>
      <SearchForm handleSubmit={handleSubmit} />
      {itemVisible && (
        <SearchResult totalLength={totalLength} filterTitle={filterTitle} filterContent={filterContent} />
      )}

      {confirmModalOpen && <ConfirmModal message={alertMessage} confirmOnClick={setConfirmModalOpen} />}
    </div>
  )
}

export default Search
