import { FormEvent, ChangeEvent, useState, useRef, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { IResultData } from 'types'
import { addNewItemApi } from 'service/getMusicSheetApi'
import styles from './postEditor.module.scss'

import Button from 'components/Button/Button'
import DropDown from 'components/DropDown/DropDown'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import UploadImage from './UploadImage/UploadImage'
import Loading from 'components/Loading/Loading'

interface Props {
  isEdit?: Boolean
  originData?: IResultData
  refetch: () => void
}

const PostEditor = ({ isEdit, originData, refetch }: Props) => {
  const navigate = useNavigate()
  const titleInput = useRef<HTMLInputElement>(null)
  const articleInput = useRef<HTMLTextAreaElement>(null)
  const [image, setImage] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('선택하세요')
  const [category, setCategory] = useState('선택하세요')
  const [note, setNote] = useState('')
  const [codeSelect, setCodeSelect] = useState(false)
  const [categorySelect, setCategorySelect] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [previewURL, setPreviewURL] = useState<string | undefined>('')
  const [imageVisible, setImageVisible] = useState(Boolean)
  const [iconCheck, setIconCheck] = useState(false)
  const [moveToBoard, setMoveToBoard] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [cancelButton, setCancelButton] = useState(false)

  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [])

  useEffect(() => {
    // console.log(originData)
    if (!isEdit || !originData) return
    setPreviewURL(originData.image)
    setTitle(originData.title)
    setCode(originData.musicCode)
    setCategory(originData.category)
    setNote(originData.article)
    setImageVisible(true)
  }, [isEdit, originData])

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.currentTarget.files) return
    const reader = new FileReader()
    reader.readAsDataURL(e.currentTarget.files[0])
    reader.onload = () => {
      setPreviewURL(String(reader.result))
      setImageVisible(true)
    }
    // console.log(e.currentTarget.files?.[0])
    setImage(e.currentTarget.files?.[0])
  }

  const { isLoading, mutate } = useMutation(addNewItemApi, {
    onSettled: () => {
      setModalOpen(true)
      setMoveToBoard(true)
      setCancelButton(false)
    },
    onSuccess: () => {
      setIconCheck(true)
      setAlertMessage('이미지 업로드 완료')
      refetch()
    },
    onError: (error) => {
      setModalOpen(true)
      // eslint-disable-next-line no-console
      console.log(error)
      setAlertMessage('이미지 업로드 실패')
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!image || !previewURL) {
      setModalOpen(true)
      setAlertMessage('이미지를 등록해주세요')
      return
    }

    if (title === '') {
      titleInput.current?.focus()
      return
    }
    if (code === '선택하세요') {
      setCodeSelect(true)
      return
    }
    if (category === '선택하세요') {
      setCategorySelect(true)
      return
    }
    if (note === '') {
      articleInput.current?.focus()
      return
    }

    isEdit ? setAlertMessage('게시글을 수정하시겠습니까?') : setAlertMessage('새로운 게시글을 등록하시겠습니까?')
    setModalOpen(true)
    setCancelButton(true)
  }
  const handlePostData = () => {
    setModalOpen(false)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('article', note)
    formData.append('musicCode', code)
    formData.append('category', category)
    formData.append('image', image)
    mutate(formData)
  }

  const handleRemoveImage = () => {
    setImageVisible(false)
    setPreviewURL('')
    setImage('')
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={styles.postEditor} ref={scrollRef}>
      {isLoading && <Loading />}
      <h3>{isEdit ? 'Modify Post ' : 'Upload Post'}</h3>
      <form action='' onSubmit={handleSubmit} id='submitForm' encType='multipart/form-data'>
        <ul className={styles.formList}>
          <li>
            <p className={styles.itemTitle}>Image</p>
            <UploadImage
              handleImageUpload={handleImageUpload}
              previewURL={previewURL}
              imageVisible={imageVisible}
              handleRemoveImage={handleRemoveImage}
            />
          </li>
          <li>
            <label htmlFor='title' className={styles.itemTitle}>
              Title
            </label>
            <input
              type='text'
              id='title'
              ref={titleInput}
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </li>
          <li>
            <DropDown label='Code' value={code} onChange={setCode} selectAlert={codeSelect} />
          </li>
          <li>
            <DropDown label='Category' value={category} onChange={setCategory} selectAlert={categorySelect} />
          </li>
          <li>
            <label htmlFor='article' className={styles.itemTitle}>
              Note
            </label>
            <textarea value={note} id='article' ref={articleInput} onChange={(e) => setNote(e.currentTarget.value)} />
          </li>
        </ul>
        <div className={styles.buttonWrap}>
          {isEdit && <Button message='Cancel' type='negative' width='width50' onClick={() => navigate(-1)} />}
          <Button submit message='Save' type='primary' width={isEdit ? 'width50' : 'widthFull'} />
        </div>
      </form>
      {modalOpen && (
        <ConfirmModal
          iconCheck={iconCheck}
          message={alertMessage}
          confirmOnClick={cancelButton ? handlePostData : setModalOpen}
          moveToBoard={moveToBoard}
          cancelButton={cancelButton}
          cancelButtonClick={handleCloseModal}
        />
      )}
    </div>
  )
}

export default PostEditor
