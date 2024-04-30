import './index.css'
import { QueryClientProvider } from "react-query"
import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { queryClient } from './lib/queryClients'
import Router from './Router'

const Toaster = lazy(() => import('@ui/sonner'))

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster richColors />
    </QueryClientProvider>
  </React.StrictMode>
)

// https://github.com/Kiranism/next-shadcn-dashboard-starter/tree/main