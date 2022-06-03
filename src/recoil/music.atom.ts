import { atom } from "recoil"

export const modalToggleState = atom<Boolean>({
  key: 'modalToggleState',
  default: false,
})