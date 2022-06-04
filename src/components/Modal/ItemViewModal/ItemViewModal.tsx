import React from 'react'
import Potal from '../Potal'
import { useRecoilValue } from 'recoil'
import styles from './ItemViewModal.module.scss'
import { INITIAL_ITEM } from 'data/data'
import { showItemId } from 'recoil/music.atom'
// import musicSheetSample from 'assets/images/1.jpg'
import { PrevIcon, HeartIcon } from 'assets/svgs'

interface Props {
  onClose: () => void;
}

const ItemViewModal = ({ onClose }: Props) => {
  const itemId = useRecoilValue(showItemId)
  const itemInfo = INITIAL_ITEM[itemId - 1]


  return (
    <Potal>
      <div className={styles.modal}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <div className={styles.top}>
              <button type='button' className={styles.topBtn} onClick={onClose}>
                <PrevIcon className={styles.prevIcon} />
              </button>
              <p className={styles.modalTitle}>Detail Item</p>
              <button type='button' className={styles.topBtn} onClick={onClose}>
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