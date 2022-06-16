import { FormEvent, ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

import Button from 'components/Button/Button'

import styles from './upload.module.scss'
import DropDown from 'components/DropDown/DropDown'
import UploadImage from './UploadImage/UploadImage'
import { useRecoil } from 'hooks/state'
import { uploadCategoryState, uploadMusicCodeState } from 'states/music.atom'

interface INewItemType {
  title: string
  article: string
  musicCode: string
  category: string
  // images: any
}

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

const addNewItem = async (newItem: INewItemType): Promise<INewItemType> => {
  const { data } = await axios.post<INewItemType>('https://pcjmusic.herokuapp.com/community/', newItem)
  return data
}

const Upload = () => {
  const { mutate } = useMutation(addNewItem)
  const [image, setImage] = useState<null | IFileList | any>(null)
  const [values, setValues] = useState({ title: '', article: '' })
  const [imageSrc, setImageSrc] = useState('')
  const [musicCode] = useRecoil(uploadMusicCodeState)
  const [category] = useRecoil(uploadCategoryState)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return
    const file = e.currentTarget.files
    const fileName = e.currentTarget.files[0].name
    setImage(file)
    setImageSrc(fileName)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { title } = values
    const { article } = values

    mutate({ title, article, musicCode, category })
  }

  return (
    <div className={styles.upload}>
      <h3>Upload Contents</h3>
      <form action='' onSubmit={handleSubmit} id='submitForm'>
        <ul className={styles.formList}>
          <li>
            <p className={styles.itemTitle}>Image</p>
            <UploadImage handleImageUpload={handleImageUpload} imageSrc={imageSrc} />
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
    </div>
  )
}

export default Upload
