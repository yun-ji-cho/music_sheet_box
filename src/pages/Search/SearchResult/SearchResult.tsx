import { IResultData } from 'types'

import styles from './searchResult.module.scss'

import ResultItem from '../ResultItem/ResultItem'
import { memo } from 'react'

interface ISearchResult {
  totalLength: number
  filterResult: IResultData[]
  title: string
}

const SearchResult = memo(({ totalLength = 0, filterResult, title }: ISearchResult) => {
  return (
    <div className={styles.searchResult}>
      <p className={styles.length}>검색결과 총 {totalLength}건을 찾았습니다.</p>
      <div className={styles.resultWrap}>
        <ResultItem filterArray={filterResult} title={title} />
      </div>
    </div>
  )
})

SearchResult.displayName = 'SearchResult'

export default SearchResult
