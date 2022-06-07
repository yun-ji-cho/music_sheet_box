import { ChangeEvent } from 'react'
import { useRecoil } from 'hooks/state'
import Select from 'react-select'
import cx from 'classnames'

import styles from './dropDown.module.scss'

import { musicCodeState } from 'states/music.atom'
import { ICodeOption } from 'types'

const CODE_OPTIONS = [
  { value: 'ALL', label: 'ALL' },
  { value: 'C', label: 'C' },
  { value: 'Db', label: 'Db' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'Gb', label: 'Gb' },
  { value: 'G', label: 'G' },
  { value: 'Ab', label: 'Ab' },
  { value: 'A', label: 'A' },
  { value: 'Bb', label: 'Bb' },
  { value: 'B', label: 'B' },
]

const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'ALL' },
  { value: '발라드', label: '발라드' },
  { value: '락', label: '락' },
  { value: '클래식', label: '클래식' },
  { value: '락 발라드', label: '락발라드' },
  { value: '재즈', label: '재즈' },
  { value: '일렉트로닉', label: '일렉트로닉' },
]

const colourStyles = {
  control: (style: any, { isFocused }: any) => ({
    ...style,
    border: isFocused ? '1px solid #DDCEF5' : '1px solid #ebebeb',
    boxShadow: 'none',
    backgroundColor: 'none',
    outline: 'none',
    color: '#ebebeb',
    width: 100,
  }),
  option: (style: any, { isFocused }: any) => {
    return {
      ...style,
      backgroundColor: isFocused ? '#DDCEF5' : null,
      color: '#333333',
      width: 100,
    }
  },
  singleValue: (base: any) => ({
    ...base,
    color: '#ebebeb',
  }),
}

interface Props {
  optionValue: string
  label?: string
  colorTheme?: string
}

const DropDown = ({ optionValue, label, colorTheme }: Props) => {
  const [, setCode] = useRecoil(musicCodeState)
  const handleSelectChange = (e: any) => {
    setCode(e.value)
  }
  let listItem
  if (optionValue === 'musicCode') listItem = CODE_OPTIONS
  if (optionValue === 'category') listItem = CATEGORY_OPTIONS

  if (!listItem) return null
  return (
    <div className={cx(styles.dropDown, { [styles.theme]: colorTheme })}>
      {label && <label htmlFor='selectCode'>{label}</label>}
      <div className={styles.select}>
        <Select
          defaultValue={listItem[0]}
          options={listItem}
          styles={colourStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
          })}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  )
}

export default DropDown
