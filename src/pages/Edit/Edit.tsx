import PostEditor from 'components/PostEditor/PostEditor'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IMusicSheetRes, IResultData } from 'types'

import styles from './edit.module.scss'

interface Props {
  data?: IMusicSheetRes
  refetch: () => void
}

const Edit = ({ data, refetch }: Props) => {
  const [originData, setOriginData] = useState<IResultData>()
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    if (!data || !id) return
    if (data.count >= 1) {
      const targetPost = data.results.find((it) => it.id === parseInt(id, 10))
      console.log(targetPost)

      if (targetPost) {
        setOriginData(targetPost)
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [data, id, navigate])

  return (
    <div className={styles.edit}>{originData && <PostEditor isEdit originData={originData} refetch={refetch} />}</div>
  )
}

export default Edit