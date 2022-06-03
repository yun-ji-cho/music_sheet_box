import { DownloadIcon } from 'assets/svgs/index'
import styles from './board.module.scss'

const Board = () => {
  const []
  const handleOpenPopup = () => {

  }
  return (
    <div className={styles.board}>
      <div className={styles.tableHeader}>
        <span className={styles.title}>Title</span>
        <span className={styles.code}>Code</span>
      </div>
      <ul className={styles.tableItemList}>
        <li>
          <button type='button' onClick={handleOpenPopup}>
            <div className={styles.left}>
              <p className={styles.title}>Blueming</p>
              <span className={styles.date}>2022.03.05</span>
            </div>
            <span className={styles.code}>F</span>
          </button>
          <a href='absg.pdf' aria-label='download' download><DownloadIcon /></a>
        </li>
      </ul>
    </div>
  )
}

export default Board
