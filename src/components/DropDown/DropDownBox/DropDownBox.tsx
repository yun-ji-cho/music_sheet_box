import { ArrowDownIcon } from 'assets/svg'
import { FormEvent, memo, useState } from 'react'
import cx from 'classnames'
import styles from './dropDownBox.module.scss'
// import { useRecoil } from 'hooks/state'
// import { searchCategoryState, searchMusicCodeState, uploadCategoryState, uploadMusicCodeState } from 'states/music.atom'

interface IProps {
  listItem: Array<string>
  value: string
  onChange: (value: string) => void
}

const DropDownBox = memo(({ listItem, value, onChange }: IProps) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)

  const handleShowDropDown = () => {
    setIsOpenDropDown((prev) => !prev)
  }

  const handleChangeTitle = (e: FormEvent<HTMLButtonElement>) => {
    onChange(e.currentTarget.value)
    setIsOpenDropDown(false)
  }

  return (
    <div className={cx(styles.dropDownBox, { [styles.isActive]: isOpenDropDown })}>
      <button type='button' className={styles.current} onClick={handleShowDropDown}>
        {value}
        <ArrowDownIcon className={styles.arrowDownIcon} />
      </button>
      {isOpenDropDown && (
        <ul className={styles.list}>
          {listItem.map((item) => {
            return (
              <li key={item} className={cx({ [styles.isActive]: item === value })}>
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
})

DropDownBox.displayName = 'DropDownBox'

export default DropDownBox
