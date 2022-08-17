import styles from './pagination.module.scss'
import { ArrowPrev, ArrowNext } from 'assets/svg/index'

interface Props {
  total: number
  page: number
  setPage: (num: number) => void
}

const Pagination = ({ total, page, setPage }: Props) => {
  const numPages = Math.ceil(total / 20)

  return (
    <div className={styles.pagination}>
      <button type='button' onClick={() => setPage(page - 1)} disabled={page === 1}>
        <ArrowPrev />
      </button>
      <input className={styles.current} type='tel' value={page} />
      <span> / </span>
      <span className={styles.total}>{numPages}</span>
      <button type='button' onClick={() => setPage(page + 1)} disabled={page === numPages}>
        <ArrowNext />
      </button>
    </div>
  )
}

export default Pagination
