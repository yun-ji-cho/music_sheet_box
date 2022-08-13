import { useEffect } from 'react'

import PostEditor from 'components/PostEditor/PostEditor'
import styles from './upload.module.scss'

interface Props {
  refetch: () => void
}

const Upload = ({ refetch }: Props) => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Upload'
  }, [])
  return (
    <div className={styles.upload}>
      <PostEditor refetch={refetch} />
    </div>
  )
}

export default Upload
