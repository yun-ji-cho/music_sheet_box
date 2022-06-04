import React from 'react'
import Potal from '../Potal'
import { CloseIcon } from 'assets/svgs/index'
import { useRecoilValue } from 'recoil'
import styles from './ItemViewModal.module.scss'
import { INITIAL_ITEM } from 'data/data'
import { showItemId } from 'recoil/music.atom'
import musicSheetSample from 'assets/images/1.jpg'

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
            <button type='button' className={styles.closeBtn} onClick={onClose}>
              <CloseIcon className={styles.closeBtn}/>
            </button>
            <div className={styles.inner}>
              <p className={styles.title}>{itemInfo.title}</p>
              <p className={styles.date}>{itemInfo.date}</p>
              <p className={styles.contents}>{itemInfo.code}</p>
              <p className={styles.contents}>{itemInfo.content}</p>
              <img src={itemInfo.image} alt={itemInfo.title} />
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ItemViewModal