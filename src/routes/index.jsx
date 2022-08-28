import { Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { isAxiosError } from 'utils/axios'
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

const App = () => {
  const { isLoading, data, refetch } = useQuery(['musicSheets'], () => getMusicSheetApi().then((res) => res.data), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    useErrorBoundary: true,
    enabled: false,
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  })
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
          <Route path='' element={<Search />} />
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
