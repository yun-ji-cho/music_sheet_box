import { atom } from 'recoil'

export const modalToggleState = atom<Boolean>({
  key: 'modalToggleState',
  default: false,
})

export const navToggleState = atom<Boolean>({
  key: 'navToggleState',
  default: false,
})

export const confirmModalState = atom<Boolean>({
  key: 'confirmModalState',
  default: false,
})

export const filterModalState = atom<Boolean>({
  key: 'filterModalState',
  default: false,
})

export const showItemId = atom({
  key: 'showItemId',
  default: '',
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
  default: ['발라드', '락', '클래식', '락발라드', '재즈', '일렉트로닉'],
})

export const searchTextState = atom({
  key: 'searchTextState',
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

export const uploadMusicCodeState = atom({
  key: 'uploadMusicCodeState',
  default: '',
})
export const uploadCategoryState = atom({
  key: 'uploadCategoryState',
  default: '',
})
