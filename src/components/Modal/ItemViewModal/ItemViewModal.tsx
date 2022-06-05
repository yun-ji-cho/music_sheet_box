import { useRecoilState, useRecoilValue } from 'recoil'

import { INITIAL_ITEM } from 'data/data'
import { IResultData } from 'types/index'
import { modalToggleState, showItemId } from 'recoil/music.atom'
import { PrevIcon, HeartIcon } from 'assets/svgs'

import styles from './ItemViewModal.module.scss'

import Potal from '../Potal'

interface Props {
  data: IResultData[] | undefined
}



const ItemViewModal = ({data}: Props) => {
  const itemId = useRecoilValue(showItemId)
  const itemInfo = data && data[itemId-2]
  
  // console.log(data);
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
            {
              data && itemInfo && (
                <div className={styles.inner}>
                  <div className={styles.image}>
                    {/* <img src={itemInfo.image} alt={itemInfo.title} /> */}
                  </div>
                  <span className={styles.category}>{itemInfo.category}</span>
                  <p className={styles.title}>{itemInfo.title}</p>
                  <span className={styles.code}>{itemInfo.musicCode}</span>
                  <span className={styles.date}>{itemInfo.created}</span>
                  <p className={styles.contents}>{itemInfo.article}</p>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ItemViewModal