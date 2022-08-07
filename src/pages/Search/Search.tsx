import { FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoil } from 'hooks/state'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import {
  confirmModalState,
  searchTextState,
  modalToggleState,
  searchTextFilterState,
  searchMusicCodeState,
  searchCategoryState,
  searchItemVisible,
} from 'states/music.atom'
import { IResultData } from 'types'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'

import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'

import loadingIcon from 'assets/images/loading.gif'

const Search = () => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [filterTitle, setFilterTitle] = useState<IResultData[] | undefined>([])
  const [filterContent, setFilterContent] = useState<IResultData[] | undefined>([])
  const [textFilter] = useRecoil(searchTextFilterState)
  const [totalLength, setTotalLength] = useState(0)
  const [search, setSearch] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [searchText] = useRecoil(searchTextState)

  const [confirmModal, setConfirmModal] = useRecoil(confirmModalState)
  const modalState = useRecoilValue(modalToggleState)
  const code = useRecoilValue(searchMusicCodeState)
  const category = useRecoilValue(searchCategoryState)

  const { data } = useQuery(['musicSheets'], () => getMusicSheetApi().then((res) => res.data), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 1,
  })

  const filterData = () => {
    if (!data) return
    const getData = data.results

    let filteredData: IResultData[] = []

    filteredData = getData

    if (code !== 'ALL') {
      filteredData = filteredData.filter((item) => item.musicCode === code)
    }
    if (category !== 'ALL') {
      filteredData = filteredData.filter((item) => item.category === category)
    }

    let filteredTitle: SetStateAction<IResultData[] | undefined>
    let filteredContent: SetStateAction<IResultData[] | undefined>

    filteredTitle = filteredData.filter((item) => item.title.includes(searchText))
    filteredContent = filteredData.filter((item) => item.article.includes(searchText))

    if (textFilter === 'Title') {
      filteredContent = []
    }
    if (textFilter === 'Content') {
      filteredTitle = []
    }

    setFilterTitle(filteredTitle)
    setFilterContent(filteredContent)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchText) {
      setConfirmModal(true)
      setAlertMessage('검색어를 입력해주세요.')
    } else {
      setSearch(true)
      setItemVisible(false)
      setTimeout(() => {
        setSearch(false)
        filterData()
        setItemVisible(true)
      }, 500)
    }
  }

  useEffect(() => {
    let titleDataLength = 0
    let contentDataLength = 0

    if (filterTitle) titleDataLength = filterTitle.length
    if (filterContent) contentDataLength = filterContent.length

    setTotalLength(titleDataLength + contentDataLength)
  }, [filterTitle, filterContent])

  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <SearchForm handleSubmit={handleSubmit} />
      {search && (
        <div className={styles.imageWrap}>
          <img src={loadingIcon} className={styles.loadingIcon} alt='loading icon' />
        </div>
      )}
      {itemVisible && (
        <SearchResult totalLength={totalLength} filterTitle={filterTitle} filterContent={filterContent} />
      )}

      {confirmModal && <ConfirmModal message={alertMessage} />}
      {modalState && <ItemViewModal data={data?.results} />}
    </div>
  )
}

export default Search
