import { FormEvent, ChangeEvent, useState } from 'react'
import { PlusIcon, FileImageIcon } from 'assets/svgs/index'
import styles from './upload.module.scss'



const Upload = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files[0])
    if(!e.currentTarget.files) return
    const fileName  = e.currentTarget.files[0].name
    setImageSrc(fileName)
  }

  const handleTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const handleCodeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.currentTarget.value)
  }
  const handleCategoryValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value)
  }
  const handleNoteValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
  }

  return (
    <div className={styles.upload}>
      <h3>Upload Contents</h3>
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
            <p className={styles.itemTitle}>Code</p>
            <input type='text' value={code} onChange={handleCodeValue} />
          </li>
          <li>
            <p className={styles.itemTitle}>Category</p>
            <input type='text' value={category} onChange={handleCategoryValue} />
          </li>
          <li>
            <p className={styles.itemTitle}>Note</p>
            <textarea value={note} onChange={handleNoteValue} />
          </li>
        </ul>
        <div className={styles.buttonWrap}>
          <button type='submit' className={styles.submitBtn}>저장</button>
        </div>
      </form>
    </div>
  )
}

export default Upload
