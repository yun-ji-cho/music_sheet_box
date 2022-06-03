import { useState } from 'hooks'
import { DownloadIcon } from 'assets/svgs/index'
import styles from './board.module.scss'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'
import Portal from 'components/Modal/Potal'

interface Props {
  title : 
}

const Board = () => {
  const [isModalOpen, setsModalState] = useState(false)
  const [itemData, setItemData] = useState({}: Props)
  const toggleModal = () => setsModalState(!isModalOpen)
  const handleItemView = () => {
    toggleModal()

  }
  return (
    <div className={styles.board}>
      <Portal>
        {isModalOpen && <ItemViewModal onClose={toggleModal} />}
      </Portal>
      {/* <ItemViewModal onClose={toggleModal}>
        This is modal contents.
      </ItemViewModal> */}
      <div className={styles.tableHeader}>
        <span className={styles.title}>Title</span>
        <span className={styles.code}>Code</span>
      </div>
      <ul className={styles.tableItemList}>
        <li>
          <button type='button' onClick={handleItemView}>
            <div className={styles.left}>
              <p className={styles.title}>Blueming</p>
              <span className={styles.date}>2022.03.05</span>
            </div>
            <span className={styles.code}>F</span>
            <input type="hidden" data-img='url(assets/images/1.jpg)'/>
          </button>
          <a href='absg.pdf' aria-label='download' download><DownloadIcon /></a>
        </li>
      </ul>
    </div>
  )
}

export default Board
