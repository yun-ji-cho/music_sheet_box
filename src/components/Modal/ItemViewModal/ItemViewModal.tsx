import React from 'react'
import Potal from '../Potal'
import {CloseIcon} from 'assets/svgs/index'
import styles from './ItemViewModal.module.scss'

interface Props {
  onClose: () => void;
}

const ItemViewModal = ({ onClose }: Props) => {

  return (
    <Potal>
      <div className={styles.modal}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <button type='button' className={styles.closeBtn} onClick={onClose}>
              <CloseIcon className={styles.closeBtn}/>
            </button>
            <div className={styles.inner}>
              <p className={styles.title}>타이틀</p>
              <p className={styles.contents}>내용</p>
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ItemViewModal