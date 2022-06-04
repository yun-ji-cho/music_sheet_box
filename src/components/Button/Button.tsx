import cx from 'classnames'
import styles from './button.module.scss'

interface Props {
  type: string
  message: string
  onClose?: () => void
}

const Button = ({message, type, onClose}: Props) => {
  if(type === 'submit') return <button type='submit' className={styles.primaryBtn}>{message}</button>

  return (
    <button type='button' className={styles.primaryBtn} onClick={onClose}>{message}</button>
  )
}

export default Button