import { FormEvent, ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

import { PlusIcon, FileImageIcon } from 'assets/svgs/index'
import Button from 'components/Button/Button'

import styles from './upload.module.scss'
import DropDown from 'components/DropDown/DropDown'
import { valueContainerCSS } from 'react-select/dist/declarations/src/components/containers'

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
  // const [image, setImage] =  useState<Array<Blob>>([])
  const [values, setValues] = useState({ title: '', article: '' })
  const [selectValues, setSelectValues] = useState({ musicCode: '', Category: '' })
  const [imageSrc, setImageSrc] = useState('')
  const [title, setTitle] = useState('')
  const [musicCode, setMusicCode] = useState('')
  const [category, setCategory] = useState('')
  const [article, setArticle] = useState('')

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
    mutate({ title, article, musicCode, category })
  }

  return (
    <div className={styles.upload}>
      <h3>Upload Contents</h3>
      <form action='' onSubmit={handleSubmit} id='submitForm'>
        <ul>
          <li>
            <p className={styles.itemTitle}>Image</p>
            <input
              type='file'
              accept='image/*'
              id='fileUpload'
              className={styles.fileUpload}
              onChange={handleImageUpload}
              name='file'
            />
            <label htmlFor='fileUpload' className={styles.selectFile}>
              <div className={styles.innerText}>
                <div className={styles.iconWrap}>
                  <FileImageIcon className={styles.fileImageIcon} />
                  <span className={styles.plusIconBG}>
                    <PlusIcon className={styles.plusIcon} />
                  </span>
                </div>
                <p className={styles.message1}>Select a Image File</p>
                <span className={styles.message2}>Click Here!</span>
              </div>
            </label>
            {imageSrc && <div className={styles.uploadFile}>{imageSrc}</div>}
          </li>
          <li>
            <label htmlFor='title' className={styles.itemTitle}>
              Title
            </label>
            <input type='text' id='title' name='title' value={title} onChange={handleChange} />
          </li>
          <li>
            <DropDown optionValue='musicCode' colorTheme='black' label='code' displayTheme='block' />
          </li>
          <li>
            <DropDown optionValue='category' colorTheme='black' label='category' displayTheme='block' />
          </li>
          <li>
            <label htmlFor='article' className={styles.itemTitle}>
              Note
            </label>
            <textarea value={article} id='article' name='article' onChange={handleChange} />
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
