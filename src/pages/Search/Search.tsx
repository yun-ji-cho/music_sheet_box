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
import { IResultData } from 'types'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'
import Loading from 'components/Loading/Loading'

interface Props {
  data: IResultData[]
}

const Search = ({ data }: Props) => {
  const [itemVisible, setItemVisible] = useRecoilState(searchItemVisible)
  const [filterTitle, setFilterTitle] = useState<IResultData[]>([])
  const [filterContent, setFilterContent] = useState<IResultData[]>([])
  const [textFilter] = useRecoil(searchTextFilterState)
  const [totalLength, setTotalLength] = useState(0)
  const [search, setSearch] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [searchText] = useRecoil(searchTextState)

  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
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
    let filteredData: IResultData[]
    filteredData = data

    if (code !== 'ALL') {
      filteredData = filteredData.filter((item) => {
        return String(item.musicCode) === code
      })
    }

    if (category !== 'ALL') {
      filteredData = filteredData.filter((item) => String(item.category) === category)
    }

    let filteredTitle: IResultData[]
    let filteredContent: IResultData[]
    filteredTitle = filteredData.filter((item) => String(item.title).includes(searchText))
    filteredContent = filteredData.filter((item) => String(item.article).includes(searchText))
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
