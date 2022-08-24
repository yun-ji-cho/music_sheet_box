import { atom } from 'recoil'

export const navToggleState = atom<Boolean>({
  key: 'navToggleState',
  default: false,
})

export const filterModalState = atom<Boolean>({
  key: 'filterModalState',
  default: false,
})

export const searchItemVisible = atom({
  key: 'searchItemVisible',
  default: false,
})

export const codeList = atom({
  key: 'codeList',
  default: ['C', 'Db', 'D', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
})
export const categoryList = atom({
  key: 'categoryList',
  default: ['발라드', 'CCM', '락', '클래식', '락발라드', '재즈', '일렉트로닉'],
})

export const searchTextState = atom({
  key: 'searchTextState',
  default: '',
})
export const searchedWordState = atom({
  key: 'searchedWordState',
  default: '',
})
export const searchTextFilterState = atom({
  key: 'searchTextFilterState',
  default: 'Any',
})
export const searchMusicCodeState = atom({
  key: 'searchMusicCodeState',
  default: 'ALL',
})
export const searchCategoryState = atom({
  key: 'searchCategoryState',
  default: 'ALL',
})

export const searchRefreshState = atom({
  key: 'searchRefreshState',
  default: true,
})
