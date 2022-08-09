import { useRecoilState, useRecoilValue } from 'recoil'
import { IResultData } from 'types/index'
import { modalToggleState, showItemId } from 'states/music.atom'
import { PrevIcon, LikeIcon } from 'assets/svg'

import styles from './ItemViewModal.module.scss'

import Potal from '../Potal'
import { useEffect, useState } from 'react'

interface ItemProps {
  data: IResultData[] | undefined
}

const ItemViewModal = ({ data }: ItemProps) => {
  const itemId = useRecoilValue(showItemId)
  const [filterData, setFilterData] = useState<IResultData>()

  useEffect(() => {
    if (!data) return
    const clickedItem = data.find((item) => item.id.toString() === itemId)
    setFilterData(clickedItem)
  }, [data, itemId])

  const [, setModalState] = useRecoilState(modalToggleState)
  const handleModalClose = () => {
    setModalState(false)
  }

  return (
    <Potal>
      <div className={styles.modal}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <div className={styles.top}>
              <button type='button' className={styles.topBtn} onClick={handleModalClose}>
                <PrevIcon className={styles.prevIcon} />
              </button>
              <p className={styles.modalTitle}>Detail Item</p>
              <button type='button' className={styles.topBtn}>
                <LikeIcon className={styles.likeIcon} />
              </button>
            </div>
            {filterData && (
              <div className={styles.inner}>
                <div className={styles.image}>
                  <img src={filterData.image} alt={filterData.title} />
                </div>
                <span className={styles.category}>{filterData.category}</span>
                <p className={styles.title}>{filterData.title}</p>
                <span className={styles.code}>{filterData.musicCode}</span>
                <span className={styles.date}>{filterData.created.slice(0, 10)}</span>
                <p className={styles.contents}>{filterData.article}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ItemViewModal
