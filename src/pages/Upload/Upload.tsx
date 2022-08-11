import PostEditor from 'components/PostEditor/PostEditor'
import styles from './upload.module.scss'

const Upload = () => {
  return (
    <div className={styles.upload}>
      <PostEditor />
    </div>
  )
}

export default Upload
