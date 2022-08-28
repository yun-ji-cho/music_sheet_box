import { useState, useEffect } from 'react'
import { useRecoil } from 'hooks/state'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getMusicSheetApi } from 'service/getMusicSheetApi'
import loadingBox from 'assets/images/bouncing_box.gif'
import styles from './Routes.module.scss'

import Search from '../pages/Search/Search'
import Board from '../pages/Board/Board'
import Upload from '../pages/Upload/Upload'
import Edit from '../pages/Edit/Edit'
import Detail from '../pages/Detail/Detail'
import PageLayout from '../components/PageLayout/PageLayout'
import Header from '../components/Header/Header'
import GNB from '../components/Modal/GNB/GNB'

import { searchTextState, searchTextFilterState, searchMusicCodeState, searchCategoryState } from 'states/music.atom'

const App = () => {
  const [searchInput] = useRecoil(searchTextState)
  const [filterType, setFilterType] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [textFilter, , resetTextFilter] = useRecoil(searchTextFilterState)
  const [code, , resetSetCode] = useRecoil(searchMusicCodeState)
  const [category, , resetCategory] = useRecoil(searchCategoryState)

  const { isLoading, data, refetch, isFetching } = useQuery(
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

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <img src={loadingBox} className={styles.loadingIcon} alt='app loader' />
      </div>
    )

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <GNB />
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
