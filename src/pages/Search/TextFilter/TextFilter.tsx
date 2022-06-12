import { useRecoil } from 'hooks/state'
import { ChangeEvent } from 'react'
import { searchTextFilterState } from 'states/music.atom'

import styles from './textFilter.module.scss'

const filterList = ['Any', 'Title', 'Content']

interface Props {
  handleFilterText: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextFilter = ({ handleFilterText }: Props) => {
  const [textFilter] = useRecoil(searchTextFilterState)
  const listItem = filterList.map((item) => (
    <li key={item}>
      <input
        type='radio'
        id={item}
        value={item}
        name='filter'
        checked={item === textFilter}
        onChange={handleFilterText}
      />
      <label htmlFor={item}>{item}</label>
    </li>
  ))

  return (
    <div className={styles.filter}>
      <p className={styles.label}>Filter by </p>
      <ul className={styles.radioBox}>{listItem}</ul>
    </div>
  )
}

export default TextFilter