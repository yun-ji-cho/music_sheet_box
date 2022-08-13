import cx from 'classnames'
import { memo } from 'react'
import styles from './button.module.scss'

interface Props {
  message: string
  submit?: true
  width: 'widthBasic' | 'width25' | 'width50' | 'widthFull'
  type: 'primary' | 'secondary' | 'negative'
  onClick?: () => void
}

const Button = memo(({ message, type, onClick, width, submit }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={cx(styles.button, styles[type], styles[width])}
      onClick={onClick}
    >
      {message}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
