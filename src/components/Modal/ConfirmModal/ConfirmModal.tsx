import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import Portal from '../Portal'
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
  confirmOnClick: Dispatch<SetStateAction<boolean>>
}

const ConfirmModal = ({ message, moveToBoard, alertState, buttonChild, confirmOnClick }: Props) => {
  const navigate = useNavigate()

  const handleOnclick = () => {
    confirmOnClick(false)
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
    <Portal>
      <div className={styles.modal}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <div className={styles.inner}>
              {handleAlertIcon()}
              <p className={styles.contents}>{message}</p>
            </div>
            <div className={styles.buttonWrap}>
              <Button message='확인' onClick={handleOnclick} type='primary' width='widthBasic' />
              {buttonChild}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default ConfirmModal
