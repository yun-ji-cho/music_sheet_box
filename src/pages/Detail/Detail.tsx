import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import styles from './detail.module.scss'
import { IResultData } from 'types/index'
import { PrevIcon } from 'assets/svg'
import { deleteItemApi } from 'service/getMusicSheetApi'
import defaultImage from 'assets/images/default_img.png'

import Button from 'components/Button/Button'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'

interface ItemProps {
  dataList: IResultData[]
  refetch: () => void
}

const Detail = ({ dataList, refetch }: ItemProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [filterData, setFilterData] = useState<IResultData>()
  const [isEditModal, setIsEditModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [message, setMessage] = useState('')
  const [moveToBoard, setMoveToBoard] = useState(false)
  const [iconCheck, setIconCheck] = useState(false)
  const [cancelButton, setCancelButton] = useState(false)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = `상세 - ${id}번 게시물`
  }, [id])

  useEffect(() => {
    refetch()
    if (dataList?.length >= 1) {
      const targetPost = dataList.find((item) => item.id === Number(id))

      if (targetPost) {
        setFilterData(targetPost)
      } else {
        setConfirmModal(true)
        setCancelButton(false)
        setMessage('없는 게시물 입니다.')
        setMoveToBoard(true)
      }
    }
  }, [dataList, id, refetch])

  const handleMoveList = () => {
    navigate(-1)
  }

  const handleEdit = () => {
    setMessage('수정하시겠습니까?')
    setConfirmModal(true)
    setCancelButton(true)
    setIsEditModal(true)
  }
  const handleDelete = () => {
    setMessage('삭제하시겠습니까?')
    setConfirmModal(true)
    setCancelButton(true)
    setIsEditModal(false)
  }
  const handleCloseModal = () => {
    setConfirmModal(false)
  }

  const { mutate } = useMutation(deleteItemApi, {
    onSuccess: () => {
      setIconCheck(true)
      setCancelButton(false)
      setMessage('게시물 삭제 완료')
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error)
      setMessage('게시물 삭제 실패')
    },
  })

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage
  }

  const confirmButtonFunc = () => {
    if (!cancelButton) {
      return navigate(-1)
    }

    if (isEditModal) {
      return navigate(`/edit/${id}`)
    }

    // refetch()
    return mutate(Number(id))
  }

  return (
    <div className={styles.detail}>
      {confirmModal && (
        <ConfirmModal
          message={message}
          iconCheck={iconCheck}
          moveToBoard={moveToBoard}
          cancelButton={cancelButton}
          confirmButtonFunc={confirmButtonFunc}
          cancelButtonFunc={handleCloseModal}
        />
      )}
      <div className={styles.top}>
        <button type='button' className={styles.backBtn} onClick={handleMoveList}>
          <PrevIcon className={styles.prevIcon} />
        </button>
        <p className={styles.modalTitle}>Detail Item</p>
      </div>
      {filterData && (
        <div className={styles.inner}>
          <div className={styles.buttonWrap}>
            <Button message='수정하기' onClick={handleEdit} type='secondary' width='width50' />
            <Button message='삭제하기' onClick={handleDelete} type='negative' width='width50' />
          </div>
          <div className={styles.image}>
            <img src={filterData.image} alt={filterData.title} onError={handleImgError} />
          </div>
          <span className={styles.category}>{filterData.category}</span>
          <p className={styles.title}>{filterData.title}</p>
          <span className={styles.code}>{filterData.musicCode}</span>
          <span className={styles.date}>{filterData.created.slice(0, 10)}</span>
          <p className={styles.contents}>{filterData.content}</p>
        </div>
      )}
    </div>
  )
}

export default Detail
