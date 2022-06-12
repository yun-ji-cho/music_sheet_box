import { ArrowDownIcon } from 'assets/svgs'
import { FormEvent, useState } from 'react'
import cx from 'classnames'
import styles from './dropDownBox.module.scss'
import { useRecoil } from 'hooks/state'
import { searchCategoryState, searchMusicCodeState, uploadCategoryState, uploadMusicCodeState } from 'states/music.atom'

interface IProps {
  listItem: Array<string>
  optionValue: string
}

const DropDownBox = ({ listItem, optionValue }: IProps) => {
  const [, setSearchMusicCode] = useRecoil(searchMusicCodeState)
  const [, setSearchCategory] = useRecoil(searchCategoryState)
  const [, setUploadMusicCode] = useRecoil(uploadMusicCodeState)
  const [, setUploadCategory] = useRecoil(uploadCategoryState)
  const [current, setCurrent] = useState('ALL')

  const [isopenDropDown, setIsopenDropDown] = useState(false)

  const handleShowDropDown = () => {
    setIsopenDropDown((prev) => !prev)
  }

  const handleChangeTitle = (e: FormEvent<HTMLButtonElement>) => {
    if (optionValue === 'searchMusicCode') setSearchMusicCode(e.currentTarget.value)
    if (optionValue === 'searchCategory') setSearchCategory(e.currentTarget.value)
    if (optionValue === 'uploadMusicCode') setUploadMusicCode(e.currentTarget.value)
    if (optionValue === 'uploadCategory') setUploadCategory(e.currentTarget.value)
    setCurrent(e.currentTarget.value)
    setIsopenDropDown(false)
  }

  return (
    <div className={cx(styles.dropDownBox, { [styles.isActive]: isopenDropDown })}>
      <button type='button' className={styles.current} onClick={handleShowDropDown}>
        {current}
        <ArrowDownIcon className={styles.arrowDownIcon} />
      </button>
      {isopenDropDown && (
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
}

export default DropDownBox
