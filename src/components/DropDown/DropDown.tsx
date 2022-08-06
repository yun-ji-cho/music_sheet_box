import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import styles from './dropDown.module.scss'

import DropDownBox from './DropDownBox/DropDownBox'
import { codeList, categoryList } from 'states/music.atom'

interface Props {
  type?: string
  value: string
  onChange: (value: string) => void
  label: string
}

const DropDown = memo(({ label, type, onChange, value }: Props) => {
  const CODE_LIST = useRecoilValue(codeList)
  const CATEGORY_LIST = useRecoilValue(categoryList)
  let listItem = label === 'Code' ? CODE_LIST : CATEGORY_LIST

  if (type === 'search') listItem = ['ALL', ...listItem]
  if (!listItem) return null

  return (
    <div className={styles.dropDown}>
      {label && <label htmlFor='selectCode'>{label}</label>}
      <div className={styles.select}>
        <DropDownBox listItem={listItem} value={value} onChange={onChange} />
      </div>
    </div>
  )
})

DropDown.displayName = 'DropDown'

export default DropDown
