import { FormEvent, ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

import Button from 'components/Button/Button'
import { PlusIcon, FileImageIcon } from 'assets/svgs/index'
import styles from './upload.module.scss'

interface INewItemType {
  title: string
  article: string
  musicCode: string
  category: string
  // images: any
}
const addNewItem = async (newItem: INewItemType): Promise<INewItemType> => {
  const { data } = await axios.post<INewItemType>('https://pcjmusic.herokuapp.com/community/', newItem)
  return data
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
    File : IImageData
  }
}


const Upload = () => {
  const { mutate } = useMutation(addNewItem)
  const [image, setImage] = useState<null | IFileList | any>(null)
  // const [image, setImage] =  useState<Array<Blob>>([])
  const [imageSrc, setImageSrc] = useState('')
  const [title, setTitle] = useState('')
  const [musicCode, setMusicCode] = useState('')
  const [category, setCategory] = useState('')
  const [article, setArticle] = useState('')
  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.currentTarget.files) return
    const file =  e.currentTarget.files
    const fileName  = e.currentTarget.files[0].name
    setImage(file)
    setImageSrc(fileName)
  }

  const handleTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const handleMusicCodeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMusicCode(e.currentTarget.value)
  }
  const handleCategoryValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value)
  }
  const handleArticleValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setArticle(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const formdata = new FormData()
    // formdata.append('images', image[0])
    // formdata.append('title', title)
    // formdata.append('article', article)
    // formdata.append('musicCode', musicCode)
    // formdata.append('category', category)
    // console.log(formdata)

    // const config = {
    //   Headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // }

    mutate({title, article, musicCode, category})
    // mutate(formdata)
  }

  return (
    <div className={styles.upload}>
      <h3>Upload Contents</h3>
      <form action="" onSubmit={handleSubmit} id='submitForm'>
        <ul>
          <li>
            <p className={styles.itemTitle}>Image</p>
            <input type='file' accept='image/*' id='fileUpload' className={styles.fileUpload} onChange={handleImageUpload} name='file'/>
            
            <label htmlFor='fileUpload' className={styles.selectFile}>
              <div className={styles.innerText}>
                <div className={styles.iconWrap}>
                  <FileImageIcon className={styles.fileImageIcon}/>
                  <span className={styles.plusIconBG}><PlusIcon className={styles.plusIcon}/></span>
                </div>
                <p className={styles.message1}>Select a Image File</p>
                <span className={styles.message2}>Click Here!</span>
              </div>
            </label>
            {imageSrc && <div className={styles.uploadFile}>{imageSrc}</div>} 
          </li>
          <li>
            <label htmlFor='title' className={styles.itemTitle}>Title</label>
            <input type='text' id='title' name='title' value={title} onChange={handleTitleValue} />
          </li>
          <li>
            <label htmlFor='musicCode' className={styles.itemTitle}>Music Code</label>
            <input type='text' id='musicCode' name='musicCode' value={musicCode} onChange={handleMusicCodeValue} />
          </li>
          <li>
            <label htmlFor='category' className={styles.itemTitle}>Category</label>
            <input type='text' id='category' name='category' value={category} onChange={handleCategoryValue} />
          </li>
          <li>
            <label htmlFor='article' className={styles.itemTitle}>Note</label>
            <textarea value={article} id='article' name='article' onChange={handleArticleValue} />
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
