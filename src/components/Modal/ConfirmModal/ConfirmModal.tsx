import React, { ReactNode, SetStateAction } from 'react'
import Potal from '../Potal'
import Button from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'
import styles from './confirmModal.module.scss'
import { WarningIcon, CheckIcon } from 'assets/svg/index'
import { cx } from 'styles'

interface Props {
  message: string
  moveToBoard?: Boolean
  alertState?: string
  buttonChild?: ReactNode
  confirmOnClick?: () => void
  handleCloseModal?: React.Dispatch<SetStateAction<boolean>>
}

const ConfirmModal = ({ message, moveToBoard, alertState, buttonChild, confirmOnClick, handleCloseModal }: Props) => {
  const navigate = useNavigate()

  const handleOnclick = () => {
    if (confirmOnClick) confirmOnClick()
    if (handleCloseModal) handleCloseModal(false)
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
              <Button message='확인' type='button' onClick={handleOnclick} func='primary' />
              {buttonChild}
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default ConfirmModal
