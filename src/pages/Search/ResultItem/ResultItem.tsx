import { MouseEvent } from 'react'
import { useRecoil, useRecoilState } from 'hooks/state'
import { modalToggleState, searchTextState, showItemId } from 'states/music.atom'

import { IResultData } from 'types'
import { BoldText } from '../BoldText'
import parse from 'html-react-parser'

import styles from './resultItem.module.scss'
import Detail from 'pages/Detail/Detail'

interface IFilter {
  filterArray: IResultData[]
  title: string
}

const ResultItem = ({ filterArray, title }: IFilter) => {
  const [searchText] = useRecoil(searchTextState)
  const [modalState, setModalState] = useRecoilState(modalToggleState)
  const [, setShowMatchedItem] = useRecoilState(showItemId)

  const handleBoldText = (item: IResultData) => {
    if (title === 'Title') {
      return (
        <>
          <p className={styles.itemTitle}>{parse(BoldText(searchText, item.title))}</p>
          <p className={styles.itemDesc}>{item.article}</p>
        </>
      )
    }
    return (
      <>
        <p className={styles.itemTitle}>{item.title}</p>
        <p className={styles.itemDesc}>{parse(BoldText(searchText, item.article))}</p>
      </>
    )
  }

  const handleOpenPopup = (e: MouseEvent<HTMLButtonElement>) => {
    setModalState(true)
    const clickItem = e.currentTarget.getAttribute('data-item')

    if (!clickItem) return
    setShowMatchedItem(clickItem)
  }

  return (
    <div className={styles.resultItem}>
      <div className={styles.titleArea}>
        <p className={styles.title}>
          {title} ({filterArray.length})
        </p>
        <ul className={styles.list}>
          {filterArray.map((item) => {
            return (
              <li className={styles.item} key={item.id}>
                <button type='button' onClick={handleOpenPopup} data-item={item.id}>
                  <div className={styles.text}>{handleBoldText(item)}</div>
                  <span className={styles.itemCode}>
                    {item.category} / {item.musicCode}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {modalState && <Detail dataList={filterArray} />}
    </div>
  )
}

export default ResultItem
