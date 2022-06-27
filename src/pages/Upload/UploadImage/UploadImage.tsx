import React, { ChangeEvent } from 'react'

import styles from './uploadImage.module.scss'

import { PlusIcon, FileImageIcon } from 'assets/svgs/index'

interface Props {
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void
  imageSrc: string
}

const UploadImage = ({ handleImageUpload, imageSrc }: Props) => {
  return (
    <>
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
        <div className={styles.image}>
          <img src={imageSrc} alt='업로드 이미지' />
        </div>
      </label>
      {imageSrc && <div className={styles.uploadFile}>{imageSrc}</div>}
    </>
  )
}

export default UploadImage
