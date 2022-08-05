import { ChangeEvent, memo, useEffect, useState } from 'react'
import cx from 'classnames'
import { CloseIcon } from 'assets/svg/index'

import { filterModalState, searchTextFilterState, searchMusicCodeState, searchCategoryState } from 'states/music.atom'

import styles from './filterModal.module.scss'

import Potal from '../../../components/Modal/Potal'
import DropDown from 'components/DropDown/DropDown'
import TextFilter from '../TextFilter/TextFilter'
import { useRecoil } from 'hooks/state'
import Button from 'components/Button/Button'

const filterList = ['Any', 'Title', 'Content']
// const CODE_OPTIONS = ['C', 'Db', 'D', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
// const CATEGORY_OPTIONS = ['발라드', '락', '클래식', '락발라드', '재즈', '일렉트로닉']

const FilterModal = memo(() => {
  const [filterModal, setFilterModal] = useRecoil(filterModalState)
  const [radioValue, setRadioValue] = useState(filterList[0])
  const [globalTextFilter, setGlobalTextFilter] = useRecoil(searchTextFilterState)
  const [code, setCode] = useState('')
  const [globalCode, setGlobalCode] = useRecoil(searchMusicCodeState)
  const [category, setCategory] = useState('')
  const [globalCategory, setGlobalCategory] = useRecoil(searchCategoryState)

  useEffect(() => {
    setRadioValue(globalTextFilter)
  }, [globalTextFilter])

  const handleApply = () => {
    setGlobalTextFilter(radioValue)
    setFilterModal(false)
  }

  const handleCloseModal = () => {
    setRadioValue(globalTextFilter)
    setFilterModal(false)
  }

  return (
    <Potal>
      <div className={cx(styles.modal, { [styles.show]: filterModal })}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <button type='button' className={styles.closeBtn} onClick={handleCloseModal}>
              <CloseIcon />
            </button>
            <div className={styles.top}>
              <p className={styles.modalTitle}>Filters</p>
            </div>
            <ul className={styles.filterList}>
              <li className={styles.line}>
                <TextFilter value={radioValue} onChange={setRadioValue} arr={filterList} />
              </li>
              <li className={styles.line}>
                <DropDown type='search' value={code} onChange={setCode} label='Code' />
              </li>
              <li className={styles.line}>
                <DropDown type='search' value={category} onChange={setCategory} label='Category' />
              </li>
            </ul>
            <div className={styles.buttonWrap}>
              <Button message='Apply Filter' fullWidth onClose={handleApply} />
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
})

FilterModal.displayName = 'FilterModal'

export default FilterModal
