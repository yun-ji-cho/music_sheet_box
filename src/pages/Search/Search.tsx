import { FormEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoil } from 'hooks/state'
import { getMusicSheetApi } from 'service/getMusicSheetApi'
import {
  confirmModalState,
  filterModalState,
  searchCategoryState,
  searchMusicCodeState,
  searchTextFilterState,
  searchTextState,
} from 'states/music.atom'
import { IResultData } from 'types'

import styles from './search.module.scss'

import Item from 'components/Item/Item'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchBox from './SearchBox/SearchBox'
import { FilterIcon } from 'assets/svg'
import FilterModal from './FilterModal/FilterModal'
import Tag from './Tag/Tag'

const Search = () => {
  const [visibleItem, setVisibleItem] = useState(false)
  const [filterTitle, setFilterTitle] = useState<IResultData[] | undefined>([])
  const [filterContent, setFilterContent] = useState<IResultData[] | undefined>([])
  const [totalLength, setTotalLength] = useState(0)
  const [alertMessage, setAlertMessage] = useState('')
  const [searchText] = useRecoil(searchTextState)
  const [textFilter] = useRecoil(searchTextFilterState)
  const [code] = useRecoil(searchMusicCodeState)
  const [category] = useRecoil(searchCategoryState)
  const [, setFilterModal] = useRecoil(filterModalState)
  const [confirmModal, setConfirmModal] = useRecoil(confirmModalState)

  const { data } = useQuery(['musicSheets'], () => getMusicSheetApi().then((res) => res.data), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
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
      setVisibleItem(true)
    }
  }

  const handleFilterModal = () => {
    setFilterModal((prev) => !prev)
  }

  useEffect(() => {
    let titleDataLength = 0
    let contentDataLength = 0

    if (filterTitle) titleDataLength = filterTitle.length
    if (filterContent) contentDataLength = filterContent.length

    setTotalLength(titleDataLength + contentDataLength)
  }, [filterTitle, filterContent])

  const tagArr = [
    { title: 'textFilter', value: textFilter },
    { title: 'code', value: code },
    { title: 'category', value: category },
  ]

  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className={styles.searchWrap}>
          <SearchBox />
          <button type='button' className={styles.filterBtn} onClick={handleFilterModal}>
            <FilterIcon className={styles.filterIcon} />
          </button>
        </div>
        <ul className={styles.tagWrap}>
          {tagArr.map((item) => (
            <Tag key={item.title} title={item.title} value={item.value} />
          ))}
        </ul>
        <FilterModal />
      </form>
      {visibleItem && (
        <div className={styles.result}>
          <p className={styles.length}>검색결과 총 {totalLength}건을 찾았습니다.</p>

          {filterTitle && filterTitle.length > 0 && (
            <div className={styles.titleArea}>
              <p className={styles.title}>Title ({filterTitle.length})</p>
              <ul className={styles.list}>
                {filterTitle.map((item) => {
                  return (
                    <li className={styles.item} key={item.id}>
                      <p>{item.title}</p>
                      <span>{item.musicCode}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {filterContent && filterContent.length > 0 && (
            <div className={styles.titleArea}>
              <p className={styles.title}>Content ({filterContent.length})</p>
              <ul className={styles.list}>
                {filterContent.map((item) => {
                  return (
                    <li className={styles.item} key={item.id}>
                      <p>{item.title}</p>
                      <span>{item.musicCode}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      {confirmModal && <ConfirmModal message={alertMessage} />}
    </div>
  )
}

export default Search
