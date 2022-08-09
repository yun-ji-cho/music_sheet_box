import { useState, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery } from 'react-query'
import loadingIcon from 'assets/images/loading.gif'

import { modalToggleState } from 'states/music.atom'
import { getMusicSheetApi } from 'service/getMusicSheetApi'

import styles from './board.module.scss'

import Item from 'components/Item/Item'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'
import SortDropDown from './SortDropDown/SortDropDown'

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
]

const Board = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sortType, setSortType] = useState('latest')
  const { isLoading, data } = useQuery(['musicSheets'], () => getMusicSheetApi().then((res) => res.data), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Board'
    scrollRef.current?.scrollIntoView()
  })

  const calcTime = (time: string) => {
    const convert = new Date(Date.parse(time))
    return convert.getTime()
  }

  const getProcessedDiaryList = () => {
    const compare = (a: { created: string }, b: { created: string }) => {
      if (sortType === 'latest') {
        return calcTime(b.created) - calcTime(a.created)
      }
      return calcTime(a.created) - calcTime(b.created)
    }
    const copyList = data?.results.slice()
    const sortedList = copyList?.sort(compare)
    return sortedList
  }

  const modalState = useRecoilValue(modalToggleState)

  if (isLoading) return <img src={loadingIcon} className={styles.loadingIcon} alt='loading icon' />

  return (
    <div className={styles.board} ref={scrollRef}>
      {modalState && <ItemViewModal data={data?.results} />}
      <div className={styles.itemCount}>
        <strong>{data?.count} </strong>개의 악보가 있습니다.
      </div>
      <SortDropDown value={sortType} onChange={setSortType} optionList={sortOptionList} />
      {data ? (
        <ul className={styles.tableItemList}>
          {getProcessedDiaryList()?.map((item) => (
            <Item key={item.id.toString()} {...item} />
          ))}
        </ul>
      ) : (
        <div className={styles.placeholderMsg}>등록된 악보가 없습니다.</div>
      )}
    </div>
  )
}

export default Board
