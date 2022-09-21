import { useNavigate } from 'react-router-dom'

import { IResultData } from 'types'
import { DownloadIcon } from 'assets/svg/index'

import styles from './item.module.scss'

const Item = (props: IResultData) => {
  const { id, title, musicCode, category, created, image } = props
  const navigate = useNavigate()

  const categoryColor = {
    발라드: `${styles.blue}`,
    CCM: `${styles.orange}`,
    락: `${styles.green}`,
    클래식: `${styles.yellow}`,
    락발라드: `${styles.pink}`,
    재즈: `${styles.red}`,
    일렉트로닉: `${styles.purple}`,
  }[category]

  const handleMoveDetail = () => {
    navigate(`/detail/${id}`)
  }

  return (
    <li className={styles.item}>
      <button type='button' onClick={handleMoveDetail}>
        <div className={styles.left}>
          <div className={styles.top}>
            <p className={`${styles.category} ${categoryColor}`}>{category}</p>
          </div>
          <p className={styles.title}>{title}</p>
          <span className={styles.date}>{created.slice(0, 10)}</span>
        </div>
        <span className={styles.code}>{musicCode}</span>
      </button>
      <a href={image} aria-label='download' download>
        <DownloadIcon />
      </a>
    </li>
  )
}

export default Item
