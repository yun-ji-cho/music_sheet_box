import React from 'react'
import {DownloadIcon} from 'assets/svgs/index'
import { ItemType } from 'types'
import styles from './item.module.scss'
import { useRecoilState } from 'recoil'
import { modalToggleState, showItemId } from 'recoil/music.atom'

type ItemProps = {
  item: ItemType 
  // handleItemView:void;
}

const Item = ({ item }: ItemProps): React.ReactElement => {
  const { id, title, date, code, image } = item
  const [, setModalState] = useRecoilState<Boolean>(modalToggleState)
  const [, setShowItemIdModal] = useRecoilState(showItemId)

  const handleModalOpen = () => {
    setModalState(true)
    setShowItemIdModal(id)
  }
  return (
    <li className={styles.item}>
      <button type='button' onClick={handleModalOpen}>
        <div className={styles.left}>
          <p className={styles.title}>{title}</p>
          <span className={styles.date}>{date}</span>
        </div>
        <span className={styles.code}>{code}</span>
        <input type="hidden" data-img={image}/>
      </button>
      <a href={image} aria-label='download' download><DownloadIcon /></a>
    </li>
  )
}

export default Item