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

export const musicCodeState = atom({
  key: 'musicCodeState',
  default: '',
})
