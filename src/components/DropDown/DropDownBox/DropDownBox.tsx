import { ArrowDownIcon } from 'assets/svgs'
import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './dropDownBox.module.css'
// import { ArrowDownIcon } from 'assets'

interface IProps {
  listItem: Array<string>
  colorTheme?: string
  onChange: (value: string) => void
}

const DropDownBox = ({ listItem, colorTheme, onChange }: IProps) => {
  const [isopenDropDown, setIsopenDropDown] = useState(false)

  const handleShowDropDown = () => {
    setIsopenDropDown((prev) => !prev)
  }

  const handleChangeTitle = (e: FormEvent<HTMLButtonElement>) => {
    setIsopenDropDown(false)
  }

  return (
    <div className={styles.dropDownBox}>
      <button type='button' onClick={handleShowDropDown}>
        {listItem[0]}
        <ArrowDownIcon />
      </button>
      {isopenDropDown && (
        <ul>
          {listItem.map((item) => {
            return (
              <li key={Math.random() * 1000}>
                <button type='button' onClick={handleChangeTitle} value={item}>
                  {item}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropDownBox
