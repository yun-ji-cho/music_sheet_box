import { useRecoilValue } from 'recoil'
import { useQuery } from 'react-query'
import loadingIcon from 'assets/images/loading.gif'

import { modalToggleState } from 'states/music.atom'
import { getMusicSheetApi } from 'service/getMusicSheetApi'

import styles from './board.module.scss'

import Item from 'components/Item/Item'
import ItemViewModal from 'components/Modal/ItemViewModal/ItemViewModal'

const Board = () => {
  const { isLoading, data } = useQuery('musicSheets', () => getMusicSheetApi().then((res) => res.data))
  const modalState = useRecoilValue(modalToggleState)

  if (isLoading) return <img src={loadingIcon} className={styles.loadingIcon} alt='loading icon' />

  return (
    <div className={styles.board}>
      {modalState && <ItemViewModal data={data?.results} />}
      <div className={styles.tableHeader}>
        <span className={styles.title}>Title</span>
        <span className={styles.code}>Code</span>
      </div>
      {data ? (
        <ul className={styles.tableItemList}>
          {data.results.map((item) => (
            <Item key={item.id.toString()} item={item} />
          ))}
        </ul>
      ) : (
        <div className={styles.placeholderMsg}>등록된 악보가 없습니다.</div>
      )}
    </div>
  )
}

export default Board
