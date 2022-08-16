import styles from './pagination.module.scss'

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
        &lt;
      </button>
      <input className={styles.current} type='tel' value={page} />
      <span className={styles.total}> / {numPages}</span>
      <button type='button' onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </div>
  )
}

export default Pagination
