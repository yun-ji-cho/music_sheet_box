import React from 'react'
import Potal from '../Potal'
import { useRecoilState, useRecoilValue } from 'recoil'
import styles from './ItemViewModal.module.scss'
import { INITIAL_ITEM } from 'data/data'
import { modalToggleState, showItemId } from 'recoil/music.atom'
import { PrevIcon, HeartIcon } from 'assets/svgs'


const ItemViewModal = () => {
  const itemId = useRecoilValue(showItemId)
  const itemInfo = INITIAL_ITEM[itemId - 1]
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
                <HeartIcon className={styles.likeIcon} />
              </button>
            </div>
            <div className={styles.inner}>
              <div className={styles.image}>
                <img src={itemInfo.image} alt={itemInfo.title} />
              </div>
              <span className={styles.category}>{itemInfo.category}</span>
              <p className={styles.title}>{itemInfo.title}</p>
              <span className={styles.code}>{itemInfo.code}</span>
              <span className={styles.date}>{itemInfo.date}</span>
              <p className={styles.contents}>{itemInfo.content}</p>
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ItemViewModal