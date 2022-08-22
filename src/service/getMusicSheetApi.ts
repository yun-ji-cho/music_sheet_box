import { axios } from 'hooks/worker'
import { IMusicSheetRes } from 'types/index'

const MUSIC_BASE_URL = 'https://pcjmusic.herokuapp.com/community'

interface Params {
  filterType?: string
  music_code?: string
  search: string
  category?: string
}

export const getMusicSheetApi = (params?: Params) =>
  axios.get<IMusicSheetRes>(`${MUSIC_BASE_URL}`, {
    params: {
      ...params,
    },
  })

export const addNewItemApi = (formData: any) => axios.post<any>('https://pcjmusic.herokuapp.com/community/', formData)

export const deleteItemApi = (id: number) => axios.delete(`${MUSIC_BASE_URL}/${id}`)
