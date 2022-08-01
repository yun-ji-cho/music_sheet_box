import { memo } from 'react'
import styles from './dropDown.module.scss'

import DropDownBox from './DropDownBox/DropDownBox'

const CODE_OPTIONS = ['C', 'Db', 'D', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const CATEGORY_OPTIONS = ['발라드', '락', '클래식', '락발라드', '재즈', '일렉트로닉']

interface Props {
  optionValue: string
  label?: string
  type?: string
}

const DropDown = memo(({ optionValue, label, type }: Props) => {
  let listItem = ['searchMusicCode', 'uploadMusicCode'].includes(optionValue) ? CODE_OPTIONS : CATEGORY_OPTIONS
  if (type === 'search') listItem = ['All', ...listItem]
  if (!listItem) return null

  return (
    <div className={styles.dropDown}>
      {label && <label htmlFor='selectCode'>{label}</label>}
      <div className={styles.select}>
        <DropDownBox listItem={listItem} optionValue={optionValue} />
      </div>
    </div>
  )
})

DropDown.displayName = 'DropDown'

export default DropDown
