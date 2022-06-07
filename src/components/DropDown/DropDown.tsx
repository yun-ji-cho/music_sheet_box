import { ChangeEvent } from 'react'
import { useRecoil } from 'hooks/state'
import Select from 'react-select'

import styles from './dropDown.module.scss'

import { musicCodeState } from 'states/music.atom'

const codeOptions = [
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

const DropDown = () => {
  const [, setCode] = useRecoil(musicCodeState)
  const handleSelectChange = (e: any) => {
    setCode(e.value)
  }
  return (
    <div className={styles.dropDown}>
      <label htmlFor='selectCode'>Code </label>
      <div className={styles.select}>
        <Select
          defaultValue={codeOptions[0]}
          options={codeOptions}
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
