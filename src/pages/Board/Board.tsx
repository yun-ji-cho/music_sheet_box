import { useState, useEffect, useRef } from 'react'

import styles from './board.module.scss'
import { IResultData } from 'types'

import Item from 'components/Item/Item'
import SortDropDown from './SortDropDown/SortDropDown'
import Loading from 'components/Loading/Loading'
import { WarningIcon } from 'assets/svg'
import Pagination from 'components/Pagination/Pagination'

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
]

interface Props {
  isLoading: Boolean
  data?: IResultData[]
  refetch: () => void
}

const Board = ({ data, isLoading, refetch }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sortType, setSortType] = useState('latest')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Board'
    scrollRef.current?.scrollIntoView()
  }, [])

  useEffect(() => {
    refetch()
  }, [data, refetch])

  const calcTime = (time: string) => {
    const convert = new Date(Date.parse(time))
    return convert.getTime()
  }

  const getProcessedItemList = () => {
    const compare = (a: { created: string }, b: { created: string }) => {
      if (sortType === 'latest') {
        return calcTime(b.created) - calcTime(a.created)
      }
      return calcTime(a.created) - calcTime(b.created)
    }
    const copyList = data?.slice()
    const sortedList = copyList?.sort(compare)
    return sortedList
  }

  if (isLoading) return <Loading />

  const handleListView = () => {
    if (!data || data.length < 1)
      <div className={styles.noContent}>
        <WarningIcon />
        <div className={styles.text}>등록된 악보가 없습니다.</div>
      </div>

    return (
      <>
        <div className={styles.topWrap}>
          <SortDropDown value={sortType} onChange={setSortType} optionList={sortOptionList} />
        </div>
        <ul className={styles.tableItemList}>
          {getProcessedItemList()?.map((item) => (
            <Item key={item.id.toString()} {...item} />
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className={styles.board} ref={scrollRef}>
      <div className={styles.itemCount}>
        <strong>{data ? data.length : 0} </strong>개의 악보가 있습니다.
      </div>
      {handleListView()}
      {data && <Pagination total={data.length} page={page} setPage={setPage} />}
    </div>
  )
}

export default Board
