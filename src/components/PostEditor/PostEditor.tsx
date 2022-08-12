import { FormEvent, ChangeEvent, useState, useRef, useEffect } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

import { IFileList, IResultData } from 'types'
import styles from './postEditor.module.scss'
import loadingIcon from 'assets/images/loading.gif'

import Button from 'components/Button/Button'
import DropDown from 'components/DropDown/DropDown'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import UploadImage from './UploadImage/UploadImage'

interface Props {
  isEdit?: Boolean
  originData?: IResultData
  refetch: () => void
}
const addNewItem = async (formData: any): Promise<any> => {
  const { data } = await axios.post<any>('https://pcjmusic.herokuapp.com/community/', formData)
  return data
}

const PostEditor = ({ isEdit, originData, refetch }: Props) => {
  const titleInput = useRef<HTMLInputElement>(null)
  const articleInput = useRef<HTMLTextAreaElement>(null)
  const [image, setImage] = useState<null | IFileList | any>(null)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [codeSelect, setCodeSelect] = useState(false)
  const [categorySelect, setCategorySelect] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [resultModalOpen, setResultModalOpen] = useState(false)
  const [previewURL, setPreviewURL] = useState<any>('')
  const [imageVisible, setImageVisible] = useState(Boolean)
  const [code, setCode] = useState('선택하세요')
  const [category, setCategory] = useState('선택하세요')
  const [alertState, setAlertState] = useState('')
  const [moveToBoard, setMoveToBoard] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.innerHTML = 'Music box - Upload'
    scrollRef.current?.scrollIntoView()
  }, [])

  useEffect(() => {
    if (!isEdit || !originData) return
    setTitle(originData.title)
    setCode(originData.musicCode)
    setCategory(originData.category)
    setNote(originData.article)
  }, [isEdit, originData])

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.currentTarget.files) return
    const reader = new FileReader()
    reader.readAsDataURL(e.currentTarget.files[0])
    reader.onload = () => {
      setPreviewURL(reader.result)
      setImageVisible(true)
    }
    setImage(e.currentTarget.files?.[0])
  }

  const { isLoading, mutate } = useMutation(addNewItem, {
    onSuccess: () => {
      setAlertState('check')
      setConfirmModalOpen(true)
      setAlertMessage('이미지 업로드 완료')
      setMoveToBoard(true)
      refetch()
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error)
      setConfirmModalOpen(true)
      setAlertMessage('이미지 업로드 실패')
      setMoveToBoard(true)
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!image) {
      setConfirmModalOpen(true)
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
    setResultModalOpen(true)
  }
  const handlePostData = () => {
    setResultModalOpen(false)

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
  }

  const handleCloseModal = () => {
    setResultModalOpen(false)
  }

  return (
    <div className={styles.postEditor} ref={scrollRef}>
      <h3>Upload Contents</h3>
      <form action='' onSubmit={handleSubmit} id='submitForm'>
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
          <Button message='SAVE' type='submit' func='primary' />
        </div>
      </form>
      {resultModalOpen && (
        <ConfirmModal
          alertState={alertState}
          message={alertMessage}
          confirmOnClick={handlePostData}
          buttonChild={<Button message='취소' type='button' onClick={handleCloseModal} func='negative' />}
        />
      )}
      {confirmModalOpen && (
        <ConfirmModal
          alertState={alertState}
          message={alertMessage}
          handleCloseModal={setConfirmModalOpen}
          moveToBoard={moveToBoard}
        />
      )}
      {isLoading && (
        <div className={styles.loading}>
          <img src={loadingIcon} className={styles.loadingIcon} alt='loading icon' />
        </div>
      )}
    </div>
  )
}

export default PostEditor
