import React from 'react'
import Potal from '../Potal'
import Button from 'components/Button/Button'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { confirmModalState } from 'states/music.atom'
import styles from './confirmModal.module.scss'
import { WarningIcon, CheckIcon } from 'assets/svg/index'
import { cx } from 'styles'

interface Props {
  message: string
  moveToBoard?: true
  alertState?: string
}

const ConfirmModal = ({ message, moveToBoard, alertState }: Props) => {
  const navigate = useNavigate()
  const [, setConfirmModal] = useRecoilState<Boolean>(confirmModalState)

  const handleConfirmClose = () => {
    setConfirmModal(false)
    if (moveToBoard) navigate(`../board`)
  }

  const handleAlertIcon = () => {
    return alertState === 'check' ? (
      <CheckIcon className={cx(styles.icon, styles.check)} />
    ) : (
      <WarningIcon className={styles.icon} />
    )
  }

  return (
    <Potal>
      <div className={styles.modal}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <div className={styles.inner}>
              {handleAlertIcon()}
              <p className={styles.contents}>{message}</p>
            </div>
            <div className={styles.buttonWrap}>
              <Button message='확인' type='button' onClose={handleConfirmClose} />
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ConfirmModal
