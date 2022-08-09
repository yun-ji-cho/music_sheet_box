import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IResultData } from 'types/index'
import { modalToggleState, showItemId } from 'states/music.atom'
import { PrevIcon, LikeIcon } from 'assets/svg'
import Button from 'components/Button/Button'

import styles from './ItemViewModal.module.scss'

import Potal from '../Potal'

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

  // const handleEdit = () => {
  //   console.log('수정하기')
  // }
  // const handleDelete = () => {
  //   console.log('삭제')
  // }

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
                <div className={styles.buttonWrap}>
                  {/* <Button message='수정하기' onClick={handleEdit} func='secondary' />
                  <Button message='삭제하기' onClick={handleDelete} func='delete' /> */}
                  <Button message='수정하기' func='secondary' />
                  <Button message='삭제하기' func='delete' />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ItemViewModal
