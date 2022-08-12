import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoil } from 'hooks/state'

import { searchTextState } from 'states/music.atom'
import { IResultData } from 'types'
import { BoldText } from '../BoldText'
import parse from 'html-react-parser'

import styles from './resultItem.module.scss'

interface IFilter {
  filterArray: IResultData[]
  title: string
}

const ResultItem = ({ filterArray, title }: IFilter) => {
  const [searchText] = useRecoil(searchTextState)
  const navigate = useNavigate()

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
    const id = Number(e.currentTarget.value)
    navigate(`/detail/${id}`)
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
                <button type='button' onClick={handleOpenPopup} value={item.id}>
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
    </div>
  )
}

export default ResultItem
