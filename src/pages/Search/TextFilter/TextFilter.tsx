import { useRecoil, useRecoilValue } from 'hooks/state'
import { ChangeEvent, memo, useState } from 'react'
import { searchTextFilterState } from 'states/music.atom'

import styles from './textFilter.module.scss'

const filterList = ['Any', 'Title', 'Content']

interface IProps {
  textApplyGlobal: () => void
}

const TextFilter = memo(({ textApplyGlobal }: IProps) => {
  const filterState = useRecoilValue(searchTextFilterState)
  console.log('전역:', filterState)
  const [localFilter, setLocalFilter] = useState(filterState)
  // const [, setTextFilter] = useRecoil(searchTextFilterState)
  const handleFilterText = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    setLocalFilter(e.currentTarget.value)
  }
  // const [textFilter] = useRecoil(searchTextFilterState)
  const listItem = filterList.map((item) => (
    <li key={item}>
      <input
        type='radio'
        id={item}
        value={item}
        name='filter'
        checked={item === localFilter}
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
