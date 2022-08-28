import { FormEvent, useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import {
  searchTextState,
  searchItemVisible,
  searchedWordState,
  // inputBlurState,
  matchedDataState,
} from 'states/music.atom'

import styles from './search.module.scss'

import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import SearchResult from './SearchResult/SearchResult'
import SearchForm from './SearchForm/SearchForm'
import { IMusicSheetRes } from 'types'

interface Props {
  data: IMusicSheetRes
  refetch: () => void
  isFetching: Boolean
}

const Search = ({ data, refetch, isFetching }: Props) => {
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [matchedData, setMatchedData] = useRecoil(matchedDataState)

  const [searchedWord, setSearchedWord] = useRecoil(searchedWordState)
  const [itemVisible, setItemVisible] = useRecoil(searchItemVisible)
  const [searchInput] = useRecoil(searchTextState)
  // const [inputBlur, setInputBlur] = useRecoil(inputBlurState)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Search'
  }, [])

  useEffect(() => {
    if (data) {
      refetch()
      setMatchedData(data.results)
    }
  }, [data, refetch, setMatchedData])

  // useEffect(() => {
  //   if (data && !searchedWord) {
  //     setMatchedData(data.results)
  //   }
  // }, [data, matchedData, searchedWord, setMatchedData])

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
    // setInputBlur(true)
  }

  return (
    <div className={styles.search}>
      <h2>Find Your Music Sheet</h2>
      <form action='' onSubmit={handleSubmit}>
        <SearchForm />
      </form>
      {itemVisible && matchedData && (
        <SearchResult totalLength={matchedData.length} filterResult={matchedData} isFetching={isFetching} />
      )}

      {confirmModalOpen && <ConfirmModal message={alertMessage} confirmButtonFunc={setConfirmModalOpen} />}
    </div>
  )
}

export default Search
