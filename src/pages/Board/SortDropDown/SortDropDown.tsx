import { Dispatch, SetStateAction } from 'react'
import styles from './sortDropDown.module.scss'

interface IListData {
  value: string
  name: string
}

interface IProps {
  value: string
  onChange: Dispatch<SetStateAction<string>>
  optionList: IListData[]
}

const SortDropDown = ({ value, onChange, optionList }: IProps) => {
  return (
    <select className={styles.sortDropDown} value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it) => (
        <option key={it.name} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  )
}

export default SortDropDown
