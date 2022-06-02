import { axios } from 'hooks/worker'
import { IMusicSheetRes } from 'types/index'

const MUSIC_BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface Params {
  searchType: string
  musicCode: string
  search: string
}

export const getMusicSheetApi = (params: Params) =>
  axios.get<IMusicSheetRes>(`${MUSIC_BASE_URL}/forecast`, {
    params: {
      ...params,
    },
  })