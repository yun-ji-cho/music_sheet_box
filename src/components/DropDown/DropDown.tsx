import { ChangeEvent } from 'react'
import { useRecoil } from 'hooks/state'
import cx from 'classnames'

import styles from './dropDown.module.scss'

import { musicCodeState } from 'states/music.atom'
import DropDownBox from './DropDownBox/DropDownBox'

const CODE_OPTIONS = ['ALL', 'C', 'Db', 'D', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const CATEGORY_OPTIONS = ['All', '발라드', '락', '클래식', '락발라드', '재즈', '일렉트로닉']

interface Props {
  optionValue: string
  label?: string
  colorTheme?: string
  displayTheme?: string
}

const DropDown = ({ optionValue, label, colorTheme, displayTheme }: Props) => {
  const [, setCode] = useRecoil(musicCodeState)
  const handleSelectChange = (e: any) => {
    setCode(e.value)
  }

  let listItem
  if (optionValue === 'musicCode') listItem = CODE_OPTIONS
  if (optionValue === 'category') listItem = CATEGORY_OPTIONS

  if (!listItem) return null

  const color = colorTheme === 'black' ? styles.black : ''
  const display = displayTheme === 'block' ? styles.display : ''

  return (
    <div className={cx(styles.dropDown, { [color]: colorTheme }, { [display]: colorTheme })}>
      {label && <label htmlFor='selectCode'>{label}</label>}
      <div className={styles.select}>
        <DropDownBox onChange={handleSelectChange} listItem={listItem} colorTheme={colorTheme} />
      </div>
    </div>
  )
}

export default DropDown
