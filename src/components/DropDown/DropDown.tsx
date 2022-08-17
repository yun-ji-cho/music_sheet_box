import { memo, FormEvent, useState, useRef, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import cx from 'classnames'

import { ArrowDownIcon } from 'assets/svg'
import styles from './dropDown.module.scss'

import { codeList, categoryList } from 'states/music.atom'

interface Props {
  type?: string
  value: string
  onChange: (value: string) => void
  label: string
  selectAlert?: Boolean
}

const DropDown = memo(({ label, type, onChange, value, selectAlert }: Props) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)
  const CODE_LIST = useRecoilValue(codeList)
  const CATEGORY_LIST = useRecoilValue(categoryList)
  const dropDownRef = useRef<HTMLDivElement>(null)
  let listItem = label === 'Code' ? CODE_LIST : CATEGORY_LIST

  const handleShowDropDown = () => {
    setIsOpenDropDown((prev) => !prev)
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  })

  const clickOutside = (e: Event) => {
    if (!dropDownRef.current) return
    if (isOpenDropDown && !dropDownRef.current.contains(e.target as Node)) {
      handleShowDropDown()
    }
  }

  if (type === 'search') listItem = ['ALL', ...listItem]
  if (!listItem) return null

  const handleChangeTitle = (e: FormEvent<HTMLButtonElement>) => {
    onChange(e.currentTarget.value)
    setIsOpenDropDown(false)
  }

  return (
    <div className={styles.dropDown}>
      {label && <label htmlFor='selectCode'>{label}</label>}
      <div className={styles.select}>
        <div ref={dropDownRef} className={cx(styles.dropDownBox, { [styles.isActive]: isOpenDropDown })}>
          <button
            type='button'
            className={cx(styles.current, { [styles.alert]: selectAlert && value === '선택하세요' })}
            onClick={handleShowDropDown}
          >
            {value}
            <ArrowDownIcon className={styles.arrowDownIcon} />
          </button>
          {isOpenDropDown && (
            <ul className={styles.list}>
              {listItem.map((item) => {
                return (
                  <li key={item} className={cx({ [styles.isActive]: item === value })}>
                    <button
                      className={cx({ [styles.alert]: alert })}
                      type='button'
                      onClick={handleChangeTitle}
                      value={item}
                    >
                      {item}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
})

DropDown.displayName = 'DropDown'

export default DropDown
