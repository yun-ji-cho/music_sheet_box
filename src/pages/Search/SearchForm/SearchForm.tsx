import { FormEvent } from 'react'
import styles from './searchForm.module.scss'

import SearchBox from '../SearchBox/SearchBox'
import { FilterIcon } from 'assets/svg'
import FilterModal from '../FilterModal/FilterModal'
import Tag from '../Tag/Tag'
import { useRecoil } from 'hooks/state'
import { filterModalState, searchCategoryState, searchMusicCodeState, searchTextFilterState } from 'states/music.atom'

interface Prop {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const SearchForm = ({ handleSubmit }: Prop) => {
  const [, setFilterModal] = useRecoil(filterModalState)
  const handleFilterModal = () => {
    setFilterModal((prev) => !prev)
  }
  const [textFilter] = useRecoil(searchTextFilterState)
  const [code] = useRecoil(searchMusicCodeState)
  const [category] = useRecoil(searchCategoryState)

  const tagArr = [
    { title: 'textFilter', value: textFilter },
    { title: 'code', value: code },
    { title: 'category', value: category },
  ]
  return (
    <form action='' onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchWrap}>
        <SearchBox />
        <button type='button' className={styles.filterBtn} onClick={handleFilterModal}>
          <FilterIcon className={styles.filterIcon} />
        </button>
      </div>
      <ul className={styles.tagWrap}>
        {tagArr.map((item) => (
          <Tag key={item.title} title={item.title} value={item.value} />
        ))}
      </ul>
      <FilterModal />
    </form>
  )
}

export default SearchForm
