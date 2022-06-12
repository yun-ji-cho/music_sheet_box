import { CloseIcon } from 'assets/svgs'

import cx from 'classnames'
import { useRecoil } from 'hooks/state'
import { searchCategoryState, searchMusicCodeState, searchTextFilterState } from 'states/music.atom'
import styles from './tag.module.scss'

interface ItagArr {
  title: string
  value: string
}

const Tag = ({ title, value }: ItagArr) => {
  const [textFilter, , resetTextFilter] = useRecoil(searchTextFilterState)
  const [code, , resetSetCode] = useRecoil(searchMusicCodeState)
  const [category, , resetCategory] = useRecoil(searchCategoryState)

  if (title === 'textFilter' && value === 'Any') return null
  if (title === 'code' && value === 'ALL') return null
  if (title === 'category' && value === 'ALL') return null

  const styleColor = {
    textFilter: `${styles.texFilter}`,
    code: `${styles.code}`,
    category: `${styles.category}`,
  }[title]

  const handleValue = () => {
    console.log(textFilter, code, category)
    if (title === 'textFilter') resetTextFilter()
    if (title === 'code') resetSetCode()
    if (title === 'category') resetCategory()
  }

  return (
    <li className={`${styles.tag} ${styleColor}`}>
      <span>{value}</span>
      <button type='button' className={styles.removeBtn}>
        <CloseIcon onClick={handleValue} />
      </button>
    </li>
  )
}

export default Tag
