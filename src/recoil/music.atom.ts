import { atom } from "recoil"

export const modalToggleState = atom<Boolean>({
  key: 'modalToggleState',
  default: false,
})

export const showItemId = atom({
  key: 'showItemId',
  default: 0,
})