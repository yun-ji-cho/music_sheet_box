import PostEditor from 'components/PostEditor/PostEditor'
import styles from './upload.module.scss'

interface Props {
  refetch: () => void
}

const Upload = ({ refetch }: Props) => {
  return (
    <div className={styles.upload}>
      <PostEditor refetch={refetch} />
    </div>
  )
}

export default Upload
