import { ChangeEvent, memo, useState } from 'react'
import cx from 'classnames'
import { CloseIcon } from 'assets/svg/index'

import { filterModalState, searchTextFilterState } from 'states/music.atom'

import styles from './filterModal.module.scss'

import Potal from '../../../components/Modal/Potal'
import DropDown from 'components/DropDown/DropDown'
import TextFilter from '../TextFilter/TextFilter'
import { useRecoil } from 'hooks/state'
import Button from 'components/Button/Button'

const FilterModal = memo(() => {
  const [filterModal, setFilterModal] = useRecoil(filterModalState)
  const [globalTextFilter, setGlobalTextFilter] = useRecoil(searchTextFilterState)
  const [localTextFilter, setTextLocalFilter] = useState(globalTextFilter)

  // const textApplyGlobal = (textFilter) => {
  //   console.log('전달')
  //   // setGlobalTextFilter()
  // }

  const handleApply = () => {
    setFilterModal(false)
  }

  const handleCloseModal = () => {
    setFilterModal(false)
    // setTextFilter((prev) => {
    //   return prev
    // })
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
                <TextFilter />
              </li>
              <li className={styles.line}>
                <DropDown optionValue='searchMusicCode' label='Code' />
              </li>
              <li className={styles.line}>
                <DropDown optionValue='searchCategory' label='Category' />
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
