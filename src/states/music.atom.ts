import { atom } from 'recoil'

export const modalToggleState = atom<Boolean>({
  key: 'modalToggleState',
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
  default: 'ALL',
})
export const uploadCategoryState = atom({
  key: 'uploadCategoryState',
  default: 'ALL',
})
