import { IResultData } from 'types'

import styles from './searchResult.module.scss'

import ResultItem from '../ResultItem/ResultItem'
import Loading from 'components/Loading/Loading'
import { useRecoilValue } from 'recoil'
import { searchedWordState } from 'states/music.atom'
import { memo } from 'react'

interface ISearchResult {
  totalLength: number
  filterResult: IResultData[]
  title: string
  isFetching: Boolean
}

const SearchResult = memo(({ totalLength = 0, filterResult, title, isFetching }: ISearchResult) => {
  const searchedWord = useRecoilValue(searchedWordState)
  return (
    <div className={styles.searchResult}>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <p className={styles.length}>
            &quot;{searchedWord}&quot; 검색결과 총 {totalLength}건을 찾았습니다.
          </p>
          <div className={styles.resultWrap}>
            <ResultItem filterArray={filterResult} title={title} />
          </div>
        </>
      )}
    </div>
  )
})

SearchResult.displayName = 'SearchResult'

export default SearchResult
