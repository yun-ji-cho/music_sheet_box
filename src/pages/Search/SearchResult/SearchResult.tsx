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
      <ResultItem filterArray={filterTitle} type='title' />
      <ResultItem filterArray={filterContent} type='content' />
    </div>
  )
}

export default SearchResult
