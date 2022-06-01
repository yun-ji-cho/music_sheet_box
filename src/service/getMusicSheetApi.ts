import axios from 'axios'
import { IMusicSheetData } from '../types/index'

// export const getMusicSheetApi = async (searchText: string): Promise<IMusicSheetData[]> => {
//   try {
//     const { data } = await axios.get<IMusicSheetData>({
//       params: {
//         searchText,
//       },
//     })
//     const singleItemArr: IMusicSheetData[] = [];
//     if (totalCount !== 1) {
//       return sortResult(responseItem, searchText);
//     }

//     return sortResult(singleItemArr.concat(responseItem), searchText);
//   } catch (error) {
//     throw new Error('API 호출 실패');
//   }
// }