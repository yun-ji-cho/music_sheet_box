import { memo } from 'react'

import styles from './textFilter.module.scss'

interface Props {
  value: string
  onChange: (value: string) => void
  arr: string[]
}

const TextFilter = memo(({ value, arr, onChange }: Props) => {
  const listItem = arr.map((item) => (
    <li key={item}>
      <input
        type='radio'
        id={item}
        value={item}
        name='filter'
        checked={item === value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={item}>{item}</label>
    </li>
  ))

  return (
    <div className={styles.filter}>
      <p className={styles.label}>Search text filter by </p>
      <ul className={styles.radioBox}>{listItem}</ul>
    </div>
  )
})

TextFilter.displayName = 'TextFilter'

export default TextFilter
