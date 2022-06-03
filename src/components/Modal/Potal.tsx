import { ReactNode } from 'react'
import reactDom from "react-dom"

interface Props {
  children: ReactNode
}

const Portal = ({ children }: Props) => {
  const el = document.getElementById('modal') as HTMLElement
  return reactDom.createPortal(children, el)
}

export default Portal