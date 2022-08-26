import { ChangeEvent, memo } from 'react'
import cx from 'classnames'

import styles from './uploadImage.module.scss'

import { PlusIcon, FileImageIcon, RoundCloseIcon } from 'assets/svg/index'

interface Props {
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void
  previewURL: string | undefined
  imageVisible: boolean
  handleRemoveImage: () => void
}

const UploadImage = memo(({ handleImageUpload, previewURL, imageVisible, handleRemoveImage }: Props) => {
  return (
    <>
      <input
        type='file'
        accept='.png, .jpeg, .gif, .jpg'
        id='fileUpload'
        className={styles.fileUpload}
        onChange={handleImageUpload}
        name='images'
      />
      <label htmlFor='fileUpload' className={cx(styles.selectFile, { [styles.imageVisible]: imageVisible })}>
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
          <img src={previewURL} alt='upload images' />
          <button type='button' className={styles.removeBtn} onClick={handleRemoveImage}>
            <RoundCloseIcon className={styles.closeBtn} />
          </button>
        </div>
      </label>
    </>
  )
})

UploadImage.displayName = 'UploadImage'

export default UploadImage
