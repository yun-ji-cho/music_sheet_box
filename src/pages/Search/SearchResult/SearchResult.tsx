import { IResultData } from 'types'

import styles from './searchResult.module.scss'

import ResultItem from '../ResultItem/ResultItem'

interface ISearchResult {
  totalLength: number
  filterTitle: IResultData[] | undefined
  filterContent: IResultData[] | undefined
}

const SearchResult = ({ totalLength, filterTitle, filterContent }: ISearchResult) => {
  return (
    <div className={styles.searchResult}>
      <p className={styles.length}>검색결과 총 {totalLength}건을 찾았습니다.</p>
      <div className={styles.resultWrap}>
        {filterTitle && filterTitle.length > 0 && <ResultItem filterArray={filterTitle} title='Title' />}
        {filterContent && filterContent.length > 0 && <ResultItem filterArray={filterContent} title='Content' />}
      </div>
    </div>
  )
}

export default SearchResult
