import { useState, useCallback } from 'react'
import { useRecoil } from 'hooks/state'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useResetRecoilState } from 'recoil'

import { getMusicSheetApi } from 'service/getMusicSheetApi'
import loadingBox from 'assets/images/bouncing_box.gif'
import {
  searchTextState,
  searchTextFilterState,
  searchMusicCodeState,
  searchCategoryState,
  searchedWordState,
  searchItemVisible,
} from 'states/music.atom'
import styles from './Routes.module.scss'

import Search from '../pages/Search/Search'
import Board from '../pages/Board/Board'
import Upload from '../pages/Upload/Upload'
import Edit from '../pages/Edit/Edit'
import Detail from '../pages/Detail/Detail'
import PageLayout from '../components/PageLayout/PageLayout'
import Header from '../components/Header/Header'
import GNB from '../components/Modal/GNB/GNB'

const App = () => {
  const [navToggle, setNavToggle] = useState(false)
  const [searchInput, , resetSearchInput] = useRecoil(searchTextState)
  const resetSearchedWord = useResetRecoilState(searchedWordState)
  const [textFilter, , resetTextFilter] = useRecoil(searchTextFilterState)
  const [code, , resetSetCode] = useRecoil(searchMusicCodeState)
  const [category, , resetCategory] = useRecoil(searchCategoryState)
  const resetItemVisible = useResetRecoilState(searchItemVisible)

  const handleResetForm = useCallback(() => {
    resetSearchInput()
    resetSearchedWord()
    resetTextFilter()
    resetSetCode()
    resetCategory()
    resetItemVisible()
  }, [resetCategory, resetItemVisible, resetSearchInput, resetSearchedWord, resetSetCode, resetTextFilter])

  const { isLoading, data, refetch, isFetching } = useQuery(
    ['musicSheets', searchInput, textFilter, code, category],
    async () => {
      textFilter.toLowerCase()
      const queryCode = code === 'ALL' ? '' : code
      const queryCategory = category === 'ALL' ? '' : category

      const res = await getMusicSheetApi({
        search: searchInput,
        filterType: textFilter,
        music_code: queryCode,
        category: queryCategory,
      })
      return res.data
    },
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      enabled: false,
    }
  )

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <img src={loadingBox} className={styles.loadingIcon} alt='app loader' />
      </div>
    )

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header navToggle={navToggle} setNavToggle={setNavToggle} />
        <GNB refetch={refetch} handleResetForm={handleResetForm} navToggle={navToggle} setNavToggle={setNavToggle} />
        <Routes>
          <Route path='' element={<Search data={data} refetch={refetch} isFetching={isFetching} />} />
          <Route path='detail/:id' element={<Detail dataList={data?.results} refetch={refetch} />} />
          <Route path='/' element={<PageLayout />}>
            <Route path='board' element={<Board data={data} isLoading={isLoading} refetch={refetch} />} />
            <Route path='upload' element={<Upload refetch={refetch} />} />
            <Route path='edit/:id' element={<Edit data={data} />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
