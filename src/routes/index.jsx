import { Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getMusicSheetApi } from 'service/getMusicSheetApi'
import { isAxiosError } from 'utils/axios'
import styles from './Routes.module.scss'

import Search from '../pages/Search/Search'
import Board from '../pages/Board/Board'
import Upload from '../pages/Upload/Upload'
import Edit from '../pages/Edit/Edit'
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import GNB from '../components/Modal/GNB/GNB'

const App = () => {
  const { isLoading, data, refetch } = useQuery(['musicSheets'], () => getMusicSheetApi().then((res) => res.data), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    useErrorBoundary: true,
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  })
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <GNB />
        <Routes>
          <Route path='' element={<Search data={data} />} />
          <Route path='/' element={<Layout />}>
            <Route path='board' element={<Board data={data} isLoading={isLoading} />} />
            <Route path='upload' element={<Upload refetch={refetch} />} />
            <Route path='edit/:id' element={<Edit data={data} />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
