import { Dispatch, SetStateAction } from 'react'

export interface IResultData {
  id: number
  title: string
  content: string
  musicCode: string
  category: string
  created: string
  image: string
}
export interface IMusicSheetRes {
  count: number
  next: null | number
  previous: null | number
  results: IResultData[]
}

export interface Nav {
  navToggle: Boolean
  setNavToggle: Dispatch<SetStateAction<boolean>>
}
