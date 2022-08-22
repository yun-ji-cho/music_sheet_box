import { useEffect } from 'react'

import PostEditor from 'components/PostEditor/PostEditor'
import styles from './upload.module.scss'

const Upload = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Upload'
  }, [])
  return (
    <div className={styles.upload}>
      <PostEditor />
    </div>
  )
}

export default Upload
