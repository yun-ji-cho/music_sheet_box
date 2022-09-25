export const BoldText = (keyword: string, text: string) => {
  return text.replace(keyword, `<mark>${keyword}</mark>`)
}
