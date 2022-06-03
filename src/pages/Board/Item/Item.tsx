import React from 'react'
import {DownloadIcon} from 'assets/svgs/index'
import { ItemType } from 'types'
import styles from './item.module.scss'
import { useRecoilState } from 'recoil'
import { modalToggleState } from 'recoil/music.atom'

type ItemProps = {
  item: ItemType 
  // handleItemView:void;
}

const Item = ({ item }: ItemProps): React.ReactElement => {
  const { title, date, code, image } = item
  const [, setModalState] = useRecoilState<Boolean>(modalToggleState)

  const handleModalOpen = () => {
    setModalState(true)
  }
  
  return (
    <li>
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