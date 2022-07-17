import { useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { searchTextState } from 'states/music.atom'

import { IResultData } from 'types'
import { BoldText } from '../BoldText'
import parse from 'html-react-parser'

import styles from './resultItem.module.scss'

interface IFilter {
  filterArray: IResultData[] | undefined
  type: string
}

const ResultItem = ({ filterArray, type }: IFilter) => {
  const [searchText] = useRecoil(searchTextState)
  const [title, setTitle] = useState('')
  const [itemLength, setItemLength] = useState(0)

  useEffect(() => {
    if (type === 'title') setTitle('Title')
    else setTitle('Content')
  }, [type])

  useEffect(() => {
    if (filterArray && filterArray.length > 0) setItemLength(filterArray.length)
  }, [filterArray])

  return (
    <div className={styles.resultItem}>
      {filterArray && itemLength > 0 && (
        <div className={styles.titleArea}>
          <p className={styles.title}>
            {title} ({itemLength})
          </p>
          <ul className={styles.list}>
            {filterArray.map((item) => {
              return (
                <li className={styles.item} key={item.id}>
                  <button type='button'>
                    <div className={styles.text}>
                      <p className={styles.itemTitle}>{parse(BoldText(searchText, item.title))}</p>
                      <p className={styles.itemDesc}>{item.article}</p>
                    </div>
                    <span className={styles.itemCode}>{item.musicCode}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ResultItem
