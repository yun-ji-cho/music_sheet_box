import PostEditor from 'components/PostEditor/PostEditor'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IMusicSheetRes, IResultData } from 'types'

import styles from './edit.module.scss'

interface Props {
  data?: IMusicSheetRes
}

const Edit = ({ data }: Props) => {
  const [originData, setOriginData] = useState<IResultData>()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = `Music box - ${id}번 게시물 수정`
  }, [id])

  useEffect(() => {
    if (!data || !id) return
    if (data.count >= 1) {
      const targetPost = data.results.find((it) => it.id === parseInt(id, 10))

      if (targetPost) {
        setOriginData(targetPost)
      } else {
        navigate('/')
      }
    }
  }, [data, id, navigate])

  return <div className={styles.edit}>{originData && <PostEditor isEdit originData={originData} />}</div>
}

export default Edit
