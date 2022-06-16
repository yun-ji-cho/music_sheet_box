import cx from 'classnames'
import { memo } from 'react'
import styles from './button.module.scss'

interface Props {
  type?: string
  message: string
  fullWidth?: Boolean
  onClose?: () => void
}

const Button = memo(({ message, type, onClose, fullWidth }: Props) => {
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
})

Button.displayName = 'Button'

export default Button
