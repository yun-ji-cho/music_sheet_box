import { useState, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'

import loadingIcon from 'assets/images/loading.gif'
import { modalToggleState } from 'states/music.atom'
import styles from './board.module.scss'

import Item from 'components/Item/Item'
import SortDropDown from './SortDropDown/SortDropDown'
import { IMusicSheetRes } from 'types'

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
]

interface Props {
  isLoading: Boolean
  data?: IMusicSheetRes
}

const Board = ({ data, isLoading }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sortType, setSortType] = useState('latest')

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Board'
    scrollRef.current?.scrollIntoView()
  }, [])

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
    const copyList = data?.results.slice()
    const sortedList = copyList?.sort(compare)
    return sortedList
  }

  if (isLoading) return <img src={loadingIcon} className={styles.loadingIcon} alt='loading icon' />

  if (!data) return <div>등록된 악보가 없습니다.</div>

  return (
    <div className={styles.board} ref={scrollRef}>
      <div className={styles.itemCount}>
        <strong>{data.count} </strong>개의 악보가 있습니다.
      </div>
      <SortDropDown value={sortType} onChange={setSortType} optionList={sortOptionList} />
      <ul className={styles.tableItemList}>
        {getProcessedItemList()?.map((item) => (
          <Item key={item.id.toString()} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default Board
