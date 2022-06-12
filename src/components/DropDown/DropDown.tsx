import styles from './dropDown.module.scss'

import DropDownBox from './DropDownBox/DropDownBox'

const CODE_OPTIONS = ['ALL', 'C', 'Db', 'D', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const CATEGORY_OPTIONS = ['ALL', '발라드', '락', '클래식', '락발라드', '재즈', '일렉트로닉']

interface Props {
  optionValue: string
  label?: string
}

const DropDown = ({ optionValue, label }: Props) => {
  const listItem =
    optionValue === 'searchMusicCode' || optionValue === 'uploadMusicCode' ? CODE_OPTIONS : CATEGORY_OPTIONS

  if (!listItem) return null

  return (
    <div className={styles.dropDown}>
      {label && <label htmlFor='selectCode'>{label}</label>}
      <div className={styles.select}>
        <DropDownBox listItem={listItem} optionValue={optionValue} />
      </div>
    </div>
  )
}

export default DropDown
