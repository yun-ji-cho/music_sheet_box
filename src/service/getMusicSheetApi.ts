import { axios } from 'hooks/worker'
import { IMusicSheetRes } from 'types/index'

const MUSIC_BASE_URL = 'http://18.177.20.169/community'

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

export const addNewItemApi = (formData: any) => axios.post<any>('http://18.177.20.169/community/', formData)
// export const addNewItemApi = (formData: any, id?: number) => {
//   id
//     ? axios.post<any>('https://pcjmusic.herokuapp.com/community/', formData)
//     : axios.put<any>(`${MUSIC_BASE_URL}/${id}`, formData)
//   // return axios.post<any>('https://pcjmusic.herokuapp.com/community/', formData)
// }

export const editItemApi = (id: number, formData: any) => axios.put<any>(`${MUSIC_BASE_URL}/${id}`, formData)

export const deleteItemApi = (id: number) => axios.delete(`${MUSIC_BASE_URL}/${id}`)
