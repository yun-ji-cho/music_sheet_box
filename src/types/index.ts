export interface IResultData {
  id: number
  title: string
  article: string
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

export interface IFileList {
  FIleList: {
    File: {
      lastModified: number
      lastModifiedDate: Date
      name: string
      size: number
      type: string
      webkitRelativePath: string
    }
  }
}
