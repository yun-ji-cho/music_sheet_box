import { useRecoilState } from 'recoil'

import { IResultData } from 'types'
import { DownloadIcon } from 'assets/svg/index'
import { modalToggleState, showItemId } from 'states/music.atom'

import styles from './item.module.scss'

const Item = ({ id, title, article, musicCode, category, created, image }: IResultData) => {
  const [, setModalState] = useRecoilState<Boolean>(modalToggleState)
  const [, setShowMatchedItem] = useRecoilState(showItemId)

  const handleModalOpen = () => {
    setModalState(true)
    setShowMatchedItem(id.toString())
  }

  return (
    <li className={styles.item}>
      <button type='button' onClick={handleModalOpen}>
        <div className={styles.left}>
          <p className={styles.title}>{title}</p>
          <span className={styles.date}>{created.slice(0, 10)}</span>
        </div>
        <span className={styles.code}>{musicCode}</span>
        <input type='hidden' data-img={image} data-category={category} data-article={article} />
      </button>
      <a href={image} aria-label='download' download>
        <DownloadIcon />
      </a>
    </li>
  )
}

export default Item
