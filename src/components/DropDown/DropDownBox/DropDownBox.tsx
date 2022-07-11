import { ArrowDownIcon } from 'assets/svg'
import { FormEvent, memo, useState } from 'react'
import cx from 'classnames'
import styles from './dropDownBox.module.scss'
import { useRecoil } from 'hooks/state'
import { searchCategoryState, searchMusicCodeState, uploadCategoryState, uploadMusicCodeState } from 'states/music.atom'

interface IProps {
  listItem: Array<string>
  optionValue: string
}

const DropDownBox = memo(({ listItem, optionValue }: IProps) => {
  const [, setSearchMusicCode] = useRecoil(searchMusicCodeState)
  const [, setSearchCategory] = useRecoil(searchCategoryState)
  const [, setUploadMusicCode] = useRecoil(uploadMusicCodeState)
  const [, setUploadCategory] = useRecoil(uploadCategoryState)
  const [current, setCurrent] = useState('ALL')

  const [isOpenDropDown, setIsOpenDropDown] = useState(false)

  const handleShowDropDown = () => {
    setIsOpenDropDown((prev) => !prev)
  }

  const handleChangeTitle = (e: FormEvent<HTMLButtonElement>) => {
    if (optionValue === 'searchMusicCode') setSearchMusicCode(e.currentTarget.value)
    if (optionValue === 'searchCategory') setSearchCategory(e.currentTarget.value)
    if (optionValue === 'uploadMusicCode') setUploadMusicCode(e.currentTarget.value)
    if (optionValue === 'uploadCategory') setUploadCategory(e.currentTarget.value)
    setCurrent(e.currentTarget.value)
    setIsOpenDropDown(false)
  }

  return (
    <div className={cx(styles.dropDownBox, { [styles.isActive]: isOpenDropDown })}>
      <button type='button' className={styles.current} onClick={handleShowDropDown}>
        {current}
        <ArrowDownIcon className={styles.arrowDownIcon} />
      </button>
      {isOpenDropDown && (
        <ul className={styles.list}>
          {listItem.map((item) => {
            return (
              <li key={item} className={cx({ [styles.isActive]: item === current })}>
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
