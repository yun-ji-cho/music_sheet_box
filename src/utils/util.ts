const debounce = (callback: () => void, duration: number) => {
  let timer: NodeJS.Timeout
  return (...args: []) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), duration)
  }
}

export { debounce }
