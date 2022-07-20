import { useRecoil } from 'hooks/state'
import { ChangeEvent, memo } from 'react'
import { searchTextFilterState } from 'states/music.atom'

import styles from './textFilter.module.scss'

const filterList = ['Any', 'Title', 'Content']

const TextFilter = memo(() => {
  const [, setTextFilter] = useRecoil(searchTextFilterState)
  const handleFilterText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.currentTarget.value)
  }
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
      <p className={styles.label}>Search text filter by </p>
      <ul className={styles.radioBox}>{listItem}</ul>
    </div>
  )
})

TextFilter.displayName = 'TextFilter'

export default TextFilter
