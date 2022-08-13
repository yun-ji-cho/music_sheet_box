import loadingIcon from 'assets/images/loading.gif'
import styles from './loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingIcon} className={styles.loadingIcon} alt='loading icon' />
    </div>
  )
}

export default Loading
