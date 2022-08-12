import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import cx from 'classnames'

import { IResultData } from 'types'
import { DownloadIcon, LikeIcon } from 'assets/svg/index'

import styles from './item.module.scss'

const Item = ({ id, title, article, musicCode, category, created, image }: IResultData) => {
  const navigate = useNavigate()
  const [like] = useState(false)

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
            <LikeIcon className={cx(styles.like, { [styles.fill]: like })} />
          </div>
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
