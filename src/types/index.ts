export interface IResultData {
  id: number
  title: string
  article: string
  musicCode: string
  category: string
  created: string
}
export interface IMusicSheetRes {
  count: number
  next: null | number
  previous: null | number
  results: IResultData[]
}

export interface ICodeOption {
  value: string
  label: string
}
