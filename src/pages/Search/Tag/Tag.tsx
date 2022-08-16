import { memo } from 'react'

import { CloseIcon } from 'assets/svg'
import { useRecoil } from 'hooks/state'
import { searchCategoryState, searchMusicCodeState, searchTextFilterState } from 'states/music.atom'
import styles from './tag.module.scss'
import { cx } from 'styles'

interface TagArr {
  title: string
  value: string
}

const Tag = memo(({ title, value }: TagArr) => {
  const [, , resetTextFilter] = useRecoil(searchTextFilterState)
  const [, , resetSetCode] = useRecoil(searchMusicCodeState)
  const [, , resetCategory] = useRecoil(searchCategoryState)

  if (title === 'textFilter' && value === 'Any') return null
  if (title === 'code' && value === 'ALL') return null
  if (title === 'category' && value === 'ALL') return null

  const handleValue = () => {
    if (title === 'textFilter') resetTextFilter()
    if (title === 'code') resetSetCode()
    if (title === 'category') resetCategory()
  }

  return (
    <li className={cx(styles.tag, styles[title])}>
      <span>{value}</span>
      <button type='button' className={styles.removeBtn}>
        <CloseIcon onClick={handleValue} />
      </button>
    </li>
  )
})

Tag.displayName = 'Tag'

export default Tag
