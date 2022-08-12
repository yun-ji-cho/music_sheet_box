import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import styles from './detail.module.scss'
import { IResultData } from 'types/index'
import { PrevIcon, LikeIcon } from 'assets/svg'
import { deleteItemApi } from 'service/getMusicSheetApi'

import Button from 'components/Button/Button'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'

interface ItemProps {
  dataList: IResultData[]
}

const Detail = ({ dataList }: ItemProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [filterData, setFilterData] = useState<IResultData>()
  const [resultModal, setResultModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [message, setMessage] = useState('')
  const [moveToBord, setMoveToBord] = useState(false)
  const [alertState, setAlertState] = useState('')
  const [moveToBoard, setMoveToBoard] = useState(false)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = `상세 - ${id}번 게시물`
  })

  useEffect(() => {
    if (dataList?.length >= 1) {
      const targetPost = dataList.find((item) => item.id === Number(id))

      if (targetPost) {
        setFilterData(targetPost)
      } else {
        setMessage('없는 게시물 입니다.')
        setResultModal(true)
        setMoveToBord(true)
      }
    }
  }, [dataList, id])

  const handleMoveList = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`)
  }
  const handleDelete = () => {
    setMessage('삭제하시겠습니까?')
    setDeleteModal(true)
  }
  const handleCloseModal = () => {
    setDeleteModal(false)
  }
  const handleMoveToBoard = () => {
    navigate(`../board`)
  }

  const { isLoading, mutate } = useMutation(deleteItemApi, {
    onSuccess: () => {
      setAlertState('check')
      setResultModal(true)
      setMessage('게시물 삭제 완료')
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error)
      setResultModal(true)
      setMessage('게시물 삭제 실패')
    },
  })

  const handleDeletePost = () => {
    mutate(Number(id))
  }

  return (
    <div className={styles.detail}>
      {resultModal && <ConfirmModal message={message} moveToBoard={moveToBord} confirmOnClick={handleMoveToBoard} />}
      {deleteModal && (
        <ConfirmModal
          message={message}
          moveToBoard={moveToBord}
          confirmOnClick={handleDeletePost}
          buttonChild={<Button message='취소' type='button' onClick={handleCloseModal} func='negative' />}
        />
      )}
      <div className={styles.top}>
        <button type='button' className={styles.topBtn} onClick={handleMoveList}>
          <PrevIcon className={styles.prevIcon} />
        </button>
        <p className={styles.modalTitle}>Detail Item</p>
        <button type='button' className={styles.topBtn}>
          <LikeIcon className={styles.likeIcon} />
        </button>
      </div>
      {filterData && (
        <div className={styles.inner}>
          <div className={styles.image}>
            <img src={filterData.image} alt={filterData.title} />
          </div>
          <span className={styles.category}>{filterData.category}</span>
          <p className={styles.title}>{filterData.title}</p>
          <span className={styles.code}>{filterData.musicCode}</span>
          <span className={styles.date}>{filterData.created.slice(0, 10)}</span>
          <p className={styles.contents}>{filterData.article}</p>
          <div className={styles.buttonWrap}>
            <Button message='수정하기' onClick={handleEdit} func='secondary' />
            <Button message='삭제하기' onClick={handleDelete} func='negative' />
          </div>
        </div>
      )}
    </div>
  )
}

export default Detail
