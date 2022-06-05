import React from 'react'
import Potal from '../Potal'
import Button from 'components/Button/Button'
import { useRecoilState } from 'recoil'
import { confirmModalState } from 'recoil/music.atom'
import styles from './confirmModal.module.scss'
// import { PrevIcon, HeartIcon } from 'assets/svgs'

interface Props {
  message: string
}

const ConfirmModal = ({ message }: Props) => {
  const [, setConfirmModal] = useRecoilState<Boolean>(confirmModalState)

  const handleConfirmClose = () => {
    setConfirmModal(false)
  }
  return (
    <Potal>
      <div className={styles.modal}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <div className={styles.inner}>
              <p className={styles.contents}>{message}</p>
            </div>
            <div className={styles.buttonWrap}>
              <Button message='확인' type='button' onClose={handleConfirmClose}/>
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ConfirmModal

