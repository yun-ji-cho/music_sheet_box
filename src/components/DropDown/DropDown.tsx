import { MouseEvent } from 'react'
import { useRecoil } from 'hooks/state'
import cx from 'classnames'

import styles from './dropDown.module.scss'

import { searchMusicCodeState, searchCategoryState, uploadMusicCodeState, uploadCategoryState } from 'states/music.atom'
import DropDownBox from './DropDownBox/DropDownBox'

const CODE_OPTIONS = ['ALL', 'C', 'Db', 'D', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const CATEGORY_OPTIONS = ['ALL', '발라드', '락', '클래식', '락발라드', '재즈', '일렉트로닉']

interface Props {
  page: string
  optionValue: string
  label?: string
  colorTheme?: string
  displayTheme?: string
}

const DropDown = ({ page, optionValue, label, colorTheme, displayTheme }: Props) => {
  const [, setSearchMusicCode] = useRecoil(searchMusicCodeState)
  const [, setUploadMusicCode] = useRecoil(uploadMusicCodeState)
  const [, setSearchCategory] = useRecoil(searchCategoryState)
  const [, setUploadCategory] = useRecoil(uploadCategoryState)

  const handleSelectChange = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    if (optionValue === 'musicCode' && page === 'search') setSearchMusicCode(value)
    if (optionValue === 'category' && page === 'upload') setUploadMusicCode(value)
    if (optionValue === 'searchCategory' && page === 'search') setSearchCategory(value)
    if (optionValue === 'uploadCategory' && page === 'upload') setUploadCategory(value)
  }

  const listItem = optionValue === 'musicCode' ? CODE_OPTIONS : CATEGORY_OPTIONS

  if (!listItem) return null

  const color = colorTheme === 'black' ? styles.black : styles.white
  const display = displayTheme === 'block' ? styles.display : ''

  return (
    <div className={cx(styles.dropDown, { [color]: colorTheme }, { [display]: colorTheme })}>
      {label && <label htmlFor='selectCode'>{label}</label>}
      <div className={styles.select}>
        <DropDownBox listItem={listItem} colorTheme={colorTheme} />
      </div>
    </div>
  )
}

export default DropDown
