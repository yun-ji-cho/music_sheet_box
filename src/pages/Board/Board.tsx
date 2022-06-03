import { useState } from 'hooks'
import styles from './board.module.scss'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'
import Portal from 'components/Modal/Potal'
import Item from 'pages/Board/Item/Item'
import { useRecoilState } from 'recoil'
import { modalToggleState } from 'recoil/music.atom'
import { INITIAL_ITEM } from 'data/data'


const Board = () => {
  const [modalState, setModalState] = useRecoilState<Boolean>(modalToggleState)
  const handleModalClose = () => {
    setModalState(false)
  }

  return (
    <div className={styles.board}>
      <Portal>
        {modalState && <ItemViewModal onClose={handleModalClose}  />}
      </Portal>
      <div className={styles.tableHeader}>
        <span className={styles.title}>Title</span>
        <span className={styles.code}>Code</span>
      </div>
      <ul className={styles.tableItemList}>
        {INITIAL_ITEM.map(item => <Item key={item.id} item={item} />)}
      </ul>
    </div>
  )
}

export default Board
