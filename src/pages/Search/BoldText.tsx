export const BoldText = (keyword: string, sickNm: string) => {
  return sickNm.replace(keyword, `<mark>${keyword}</mark>`)
}
