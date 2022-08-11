import { FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  searchTextState,
  modalToggleState,
  searchTextFilterState,
  searchMusicCodeState,
  searchCategoryState,
  searchItemVisible,
} from 'states/music.atom'
import { IResultData, IMusicSheetRes } from 'types'

import styles from './search.module.scss'
import loadingIcon from 'assets/images/loading.gif'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'

interface Props {
  data?: IMusicSheetRes
}

const Search = ({ data }: Props) => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [filterTitle, setFilterTitle] = useState<IResultData[] | undefined>([])
  const [filterContent, setFilterContent] = useState<IResultData[] | undefined>([])
  const [textFilter] = useRecoil(searchTextFilterState)
  const [totalLength, setTotalLength] = useState(0)
  const [search, setSearch] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [searchText] = useRecoil(searchTextState)

  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const modalState = useRecoilValue(modalToggleState)
  const code = useRecoilValue(searchMusicCodeState)
  const category = useRecoilValue(searchCategoryState)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Search'
  }, [])

  useEffect(() => {
    let titleDataLength = 0
    let contentDataLength = 0

    if (filterTitle) titleDataLength = filterTitle.length
    if (filterContent) contentDataLength = filterContent.length

    setTotalLength(titleDataLength + contentDataLength)
  }, [filterTitle, filterContent])

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
      setConfirmModalOpen(true)
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

      {confirmModalOpen && <ConfirmModal message={alertMessage} handleCloseModal={setConfirmModalOpen} />}
      {modalState && <ItemViewModal data={data?.results} />}
    </div>
  )
}

export default Search
