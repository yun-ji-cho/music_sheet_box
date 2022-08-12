import { axios } from 'hooks/worker'
import { IMusicSheetRes } from 'types/index'

const MUSIC_BASE_URL = 'https://pcjmusic.herokuapp.com/community'

interface Params {
  filterType: string
  music_code: string
  search: string
}

export const getMusicSheetApi = (params?: Params) =>
  axios.get<IMusicSheetRes>(`${MUSIC_BASE_URL}`, {
    params: {
      ...params,
    },
  })

export const deleteItemApi = async (id: number) => {
  const { data } = await axios.delete(`${MUSIC_BASE_URL}/${id}`)
  return data
}
