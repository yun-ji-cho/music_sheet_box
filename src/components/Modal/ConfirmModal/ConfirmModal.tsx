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
  iconCheck?: Boolean
  cancelButton?: Boolean
  cancelButtonClick?: () => void
  // buttonChild?: ReactNode
  confirmOnClick: Dispatch<SetStateAction<boolean>>
}

const ConfirmModal = ({ message, moveToBoard, iconCheck, confirmOnClick, cancelButtonClick, cancelButton }: Props) => {
  const navigate = useNavigate()

  const handleOnclick = () => {
    confirmOnClick(false)
    if (moveToBoard) navigate(`../board`)
  }

  const handleAlertIcon = () => {
    return iconCheck ? <CheckIcon className={cx(styles.icon, styles.check)} /> : <WarningIcon className={styles.icon} />
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
              {cancelButton && <Button message='취소' onClick={cancelButtonClick} type='negative' width='widthBasic' />}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default ConfirmModal
