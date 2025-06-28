import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderWithRedirect from './Pages/Auth0ProviderWithRedirect'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Auth0ProviderWithRedirect>
      <AppRoutes />
    </Auth0ProviderWithRedirect>
    </BrowserRouter>
  </StrictMode>,
)
