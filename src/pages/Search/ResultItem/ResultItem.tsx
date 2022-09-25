import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { IResultData } from 'types'

import { useRecoilValue } from 'recoil'
import { searchedWordState, searchTextFilterState } from 'states/music.atom'

import styles from './resultItem.module.scss'
import defaultImage from 'assets/images/default_img.png'

import { BoldText } from '../BoldText'

interface IFilter {
  filterArray: IResultData[]
}

const ResultItem = ({ filterArray }: IFilter) => {
  const navigate = useNavigate()
  const searchedWord = useRecoilValue(searchedWordState)
  const title = useRecoilValue(searchTextFilterState)

  const handleBoldText = (item: IResultData) => {
    return (
      <>
        <p className={styles.itemTitle}>
          {title !== 'Content' ? parse(BoldText(searchedWord, item.title)) : item.title}
        </p>
        <p className={styles.itemDesc}>
          {title !== 'Title' ? parse(BoldText(searchedWord, item.content)) : item.content}
        </p>
      </>
    )
  }

  const handleMoveDetail = (e: MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.value)
    navigate(`/detail/${id}`)
  }

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage
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
                <button type='button' onClick={handleMoveDetail} value={item.id}>
                  <div className={styles.imageWrap}>
                    <img
                      className={styles.image}
                      src={`http://18.177.20.169/media/${item.image}`}
                      alt={item.title}
                      onError={handleImgError}
                    />
                  </div>
                  <div className={styles.text}>{handleBoldText(item)}</div>
                  <div className={styles.itemDetail}>
                    {item.category} / {item.musicCode}
                  </div>
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
