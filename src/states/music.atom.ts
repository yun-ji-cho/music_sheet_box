import { atom } from 'recoil'

export const modalToggleState = atom<Boolean>({
  key: 'modalToggleState',
  default: false,
})

export const confirmModalState = atom<Boolean>({
  key: 'confirmModalState',
  default: false,
})

export const showItemId = atom({
  key: 'showItemId',
  default: 0,
})

export const searchTextState = atom({
  key: 'searchTextState',
  default: '',
})

export const searchMusicCodeState = atom({
  key: 'searchMusicCodeState',
  default: '',
})
export const searchCategoryState = atom({
  key: 'searchCategoryState',
  default: '',
})
export const uploadMusicCodeState = atom({
  key: 'uploadMusicCodeState',
  default: '',
})
export const uploadCategoryState = atom({
  key: 'uploadCategoryState',
  default: '',
})
