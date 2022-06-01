import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import RootRoute from './routes'
import reportWebVitals from './reportWebVitals'

import './styles/index.scss'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false } },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RecoilRoot>
          <RootRoute />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
