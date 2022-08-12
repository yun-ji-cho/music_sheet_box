import cx from 'classnames'
import { memo } from 'react'
import styles from './button.module.scss'

interface Props {
  type?: string
  message: string
  fullWidth?: Boolean
  onClick?: () => void
  func: 'primary' | 'secondary' | 'negative'
}

const Button = memo(({ message, type, onClick, fullWidth, func }: Props) => {
  if (type === 'submit')
    return (
      <button type='submit' className={cx(styles.button, styles[func], { [styles.full]: fullWidth })}>
        {message}
      </button>
    )

  return (
    <button type='button' className={cx(styles.button, styles[func], { [styles.full]: fullWidth })} onClick={onClick}>
      {message}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
