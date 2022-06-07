import { ChangeEvent } from 'react'

import styles from './filter.module.scss'

const filterList = ['any', 'title', 'content']

interface Props {
  handleFilter: (e: ChangeEvent<HTMLInputElement>) => void
}

const Filter = ({ handleFilter }: Props) => {
  const listItem = filterList.map((item) => (
    <li key={item}>
      <input
        type='radio'
        id={item}
        value={item}
        name='filter'
        onChange={handleFilter}
        defaultChecked={item === 'any'}
      />
      <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</label>
    </li>
  ))

  return (
    <div className={styles.filter}>
      <span>Filter by </span>
      <ul className={styles.selectBox}>{listItem}</ul>
    </div>
  )
}

export default Filter
