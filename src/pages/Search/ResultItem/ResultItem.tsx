import { useEffect, useState, MouseEvent } from 'react'
import { useRecoil, useRecoilState } from 'hooks/state'
import { modalToggleState, searchTextState, showItemId } from 'states/music.atom'

import { IResultData } from 'types'
import { BoldText } from '../BoldText'
import parse from 'html-react-parser'

import styles from './resultItem.module.scss'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'

interface IFilter {
  filterArray: IResultData[] | undefined
  type: string
}

const ResultItem = ({ filterArray, type }: IFilter) => {
  const [searchText] = useRecoil(searchTextState)
  const [title, setTitle] = useState('')
  const [itemLength, setItemLength] = useState(0)
  // const [modalVisible, setModalVisible] = useState(false)
  const [modalState, setModalState] = useRecoilState(modalToggleState)
  const [, setShowMatchedItem] = useRecoilState(showItemId)

  useEffect(() => {
    if (type === 'title') setTitle('Title')
    else setTitle('Content')
  }, [type])

  useEffect(() => {
    if (filterArray && filterArray.length > 0) setItemLength(filterArray.length)
  }, [filterArray])

  const handleBoldText = (item: IResultData) => {
    if (type === 'title') {
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
  console.log(filterArray)

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
                  <button type='button' onClick={handleOpenPopup} data-item={item.id}>
                    <div className={styles.text}>{handleBoldText(item)}</div>
                    <span className={styles.itemCode}>{item.musicCode}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {modalState && <ItemViewModal data={filterArray} />}
    </div>
  )
}

export default ResultItem
