import { ChangeEvent } from 'react'
import cx from 'classnames'

import { filterModalState, searchTextFilterState } from 'states/music.atom'

import styles from './filterModal.module.scss'

import Potal from '../../../components/Modal/Potal'
import DropDown from 'components/DropDown/DropDown'
import Filter from '../TextFilter/TextFilter'
import { useRecoil } from 'hooks/state'
import Button from 'components/Button/Button'

const FilterModal = () => {
  const [, setTextFilter] = useRecoil(searchTextFilterState)
  const [filterModal, setFilterModal] = useRecoil(filterModalState)

  const handleFilterText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.currentTarget.value)
  }
  const handleFilterApply = () => {
    setFilterModal(false)
  }

  return (
    <Potal>
      <div className={cx(styles.modal, { [styles.show]: filterModal })}>
        <div className={styles.modalLayOut}>
          <div className={styles.modalBox}>
            <div className={styles.top}>
              <p className={styles.modalTitle}>Filters</p>
            </div>
            <ul className={styles.filterList}>
              <li className={styles.line}>
                <Filter handleFilterText={handleFilterText} />
              </li>
              <li className={styles.line}>
                <DropDown optionValue='searchMusicCode' label='Code' />
              </li>
              <li className={styles.line}>
                <DropDown optionValue='searchCategory' label='Category' />
              </li>
            </ul>
            <div className={styles.buttonWrap}>
              <Button message='Apply Filter' fullWidth onClose={handleFilterApply} />
            </div>
          </div>
        </div>
      </div>
    </Potal>
  )
}

export default FilterModal
