import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import App from './App.jsx'
 import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router'

const queryClient = new QueryClient()
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key')
}
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </QueryClientProvider>
    </BrowserRouter>
)
