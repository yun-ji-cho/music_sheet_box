import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import styles from './dropDown.module.scss'

import DropDownBox from './DropDownBox/DropDownBox'
import { codeList, categoryList } from 'states/music.atom'

interface Props {
  type?: string
  value: string
  onChange: (value: string) => void
  label?: string
  // list: string[]
}

const DropDown = memo(({ label, type, onChange, value }: Props) => {
  let listItem = useRecoilValue(codeList)
  let listItem = useRecoilValue(codeList)
  // let listItem = ['searchMusicCode', 'uploadMusicCode'].includes(optionValue) ? CODE_OPTIONS : CATEGORY_OPTIONS

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
