import { ArrowDownIcon } from 'assets/svgs'
import { FormEvent, useEffect, useRef, useState, MouseEvent } from 'react'
import cx from 'classnames'
import styles from './dropDownBox.module.scss'
// import { ArrowDownIcon } from 'assets'

interface IProps {
  listItem: Array<string>
  colorTheme?: string
}

const DropDownBox = ({ listItem, colorTheme }: IProps) => {
  const [current, setCurrent] = useState(listItem[0])
  const [isopenDropDown, setIsopenDropDown] = useState(false)

  const handleShowDropDown = () => {
    setIsopenDropDown((prev) => !prev)
  }

  const handleChangeTitle = (e: FormEvent<HTMLButtonElement>) => {
    setCurrent(e.currentTarget.value)
    setIsopenDropDown(false)
  }

  const color = colorTheme === 'black' ? styles.black : styles.white

  return (
    <div className={cx(styles.dropDownBox, { [color]: colorTheme }, { [styles.isActive]: isopenDropDown })}>
      <button type='button' className={styles.current} onClick={handleShowDropDown}>
        {current}
        <ArrowDownIcon className={cx(styles.arrowDownIcon, { [color]: colorTheme })} />
      </button>
      {isopenDropDown && (
        <ul className={styles.list}>
          {listItem.map((item) => {
            return (
              <li key={item}>
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
