import cx from 'classnames'
import styles from './button.module.scss'

interface Props {
  type?: string
  message: string
  fullWidth?: Boolean
  onClose?: () => void
}

const Button = ({ message, type, onClose, fullWidth }: Props) => {
  if (type === 'submit')
    return (
      <button type='submit' className={cx(styles.primaryBtn, { [styles.full]: fullWidth })}>
        {message}
      </button>
    )

  return (
    <button type='button' className={cx(styles.primaryBtn, { [styles.full]: fullWidth })} onClick={onClose}>
      {message}
    </button>
  )
}

export default Button
