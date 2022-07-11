import { FormEvent, ChangeEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import axios from 'axios'

import Button from 'components/Button/Button'

import styles from './upload.module.scss'
import DropDown from 'components/DropDown/DropDown'
import UploadImage from './UploadImage/UploadImage'
import ConfirmModal from 'components/Modal/ConfirmModal/ConfirmModal'
import { uploadCategoryState, uploadMusicCodeState, confirmModalState } from 'states/music.atom'

interface IImageData {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

interface IFileList {
  FIleList: {
    File: IImageData
  }
}

const Upload = () => {
  const [image, setImage] = useState<null | IFileList | any>(null)
  const [values, setValues] = useState({ title: '', article: '' })
  const [alertMessage, setAlertMessage] = useState('')
  const [confirmModal, setConfirmModal] = useRecoilState<Boolean>(confirmModalState)
  const [previewURL, setPreviewURL] = useState<any>('')
  const [imageVisible, setImageVisible] = useState(Boolean)
  const [musicCode, setMusicCode] = useRecoilState(uploadMusicCodeState)
  const [category, setCategory] = useRecoilState(uploadCategoryState)

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

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { title, article } = values

    const formData = new FormData()
    formData.append('title', title)
    formData.append('article', article)
    formData.append('musicCode', musicCode)
    formData.append('category', category)
    formData.append('image', image)
    axios({
      method: 'POST',
      url: `https://pcjmusic.herokuapp.com/community/`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response)
        setConfirmModal(true)
        setAlertMessage('이미지 업로드 완료')
        setValues({ title: '', article: '' })
        setMusicCode('ALL')
        setCategory('ALL')
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
        setConfirmModal(true)
        setAlertMessage('이미지 업로드 실패')
      })
  }

  const handleRemoveImage = () => {
    setImageVisible(false)
    setPreviewURL('')
  }

  return (
    <div className={styles.upload}>
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
            <input type='text' id='title' name='title' value={values.title} onChange={handleChange} />
          </li>
          <li>
            <DropDown optionValue='uploadMusicCode' label='Code' />
          </li>
          <li>
            <DropDown optionValue='uploadCategory' label='Category' />
          </li>
          <li>
            <label htmlFor='article' className={styles.itemTitle}>
              Note
            </label>
            <textarea value={values.article} id='article' name='article' onChange={handleChange} />
          </li>
        </ul>
        <div className={styles.buttonWrap}>
          <Button message='SAVE' type='submit' />
        </div>
      </form>
      {confirmModal && <ConfirmModal message={alertMessage} />}
    </div>
  )
}

export default Upload
