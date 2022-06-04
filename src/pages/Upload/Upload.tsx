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
}
const addNewItem = async (newItem: INewItemType): Promise<INewItemType> => {
  const { data } = await axios.post<INewItemType>('https://pcjmusic.herokuapp.com/community/', newItem)
  return data
}



const Upload = () => {
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(addNewItem)
  const [imageSrc, setImageSrc] = useState('')
  const [title, setTitle] = useState('')
  const [musicCode, setMusicCode] = useState('')
  const [category, setCategory] = useState('')
  const [article, setArticle] = useState('')
  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files[0])
    if(!e.currentTarget.files) return
    const fileName  = e.currentTarget.files[0].name
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
    mutate({title, article, musicCode, category})
  }

  return (
    <div className={styles.upload}>
      <h3>Upload Contents</h3>
      {isLoading ? ('Adding item') : null}
      {isError && <p>error: 에러입니다.</p>}
      {isSuccess && <p>Todo added!</p>}
      <form action="" onSubmit={handleSubmit}>
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
            <p className={styles.itemTitle}>Title</p>
            <input type='text' value={title} onChange={handleTitleValue} />
          </li>
          <li>
            <p className={styles.itemTitle}>Music Code</p>
            <input type='text' value={musicCode} onChange={handleMusicCodeValue} />
          </li>
          <li>
            <p className={styles.itemTitle}>Category</p>
            <input type='text' value={category} onChange={handleCategoryValue} />
          </li>
          <li>
            <p className={styles.itemTitle}>Note</p>
            <textarea value={article} onChange={handleArticleValue} />
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
