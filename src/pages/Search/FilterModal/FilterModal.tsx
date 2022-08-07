import { memo, useEffect, useState } from 'react'
import cx from 'classnames'
import { CloseIcon } from 'assets/svg/index'
import { useRecoil } from 'hooks/state'

import { filterModalState, searchTextFilterState, searchMusicCodeState, searchCategoryState } from 'states/music.atom'

import styles from './filterModal.module.scss'

import Potal from '../../../components/Modal/Potal'
import DropDown from 'components/DropDown/DropDown'
import TextFilter from '../TextFilter/TextFilter'
import Button from 'components/Button/Button'

const filterList = ['Any', 'Title', 'Content']

const FilterModal = memo(() => {
  const [filterModal, setFilterModal] = useRecoil(filterModalState)
  const [radioValue, setRadioValue] = useState(filterList[0])
  const [globalTextFilter, setGlobalTextFilter] = useRecoil(searchTextFilterState)
  const [globalCode, setGlobalCode] = useRecoil(searchMusicCodeState)
  const [globalCategory, setGlobalCategory] = useRecoil(searchCategoryState)
  const [code, setCode] = useState(globalCode)
  const [category, setCategory] = useState(globalCategory)

  useEffect(() => {
    setRadioValue(globalTextFilter)
    setCode(globalCode)
    setCategory(globalCategory)
  }, [globalCategory, globalCode, globalTextFilter])

  const handleApply = () => {
    setGlobalTextFilter(radioValue)
    setGlobalCode(code)
    setGlobalCategory(category)
    setFilterModal(false)
  }

  const handleCloseModal = () => {
    setFilterModal(false)
    setRadioValue(globalTextFilter)
    setCode(globalCode)
    setCategory(globalCategory)
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
