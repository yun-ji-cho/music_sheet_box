import { FormEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoil } from 'hooks/state'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import {
  confirmModalState,
  searchTextState,
  modalToggleState,
  searchTextFilterState,
  searchItemVisible,
} from 'states/music.atom'
import { IResultData } from 'types'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'

import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'

const Search = () => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [filterTitle, setFilterTitle] = useState<IResultData[] | undefined>([])
  const [filterContent, setFilterContent] = useState<IResultData[] | undefined>([])
  const [textFilter] = useRecoil(searchTextFilterState)
  const [totalLength, setTotalLength] = useState(0)
  const [alertMessage, setAlertMessage] = useState('')
  const [searchText] = useRecoil(searchTextState)

  const [confirmModal, setConfirmModal] = useRecoil(confirmModalState)
  const modalState = useRecoilValue(modalToggleState)

  const { data } = useQuery(['musicSheets'], () => getMusicSheetApi().then((res) => res.data), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 1,
  })

  const filterData = () => {
    if (!data) return
    const getData = data.results
    let filteredTitle
    let filteredContent

    if (textFilter === 'Any') {
      filteredTitle = getData.filter((item) => item.title.includes(searchText))
      filteredContent = getData.filter((item) => item.article.includes(searchText))
    }
    if (textFilter === 'Title') {
      filteredTitle = getData.filter((item) => item.title.includes(searchText))
      filteredContent = []
    }
    if (textFilter === 'Content') {
      filteredTitle = []
      filteredContent = getData.filter((item) => item.article.includes(searchText))
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
      filterData()
      setItemVisible(true)
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
      {itemVisible && (
        <SearchResult totalLength={totalLength} filterTitle={filterTitle} filterContent={filterContent} />
      )}

      {confirmModal && <ConfirmModal message={alertMessage} />}
      {modalState && <ItemViewModal data={data?.results} />}
    </div>
  )
}

export default Search
