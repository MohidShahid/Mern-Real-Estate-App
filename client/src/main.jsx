import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderWithRedirect from './Pages/Auth0ProviderWithRedirect'
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination'; // Import Swiper pagination styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Auth0ProviderWithRedirect>
      <AppRoutes />
    </Auth0ProviderWithRedirect>
    </BrowserRouter>
  </StrictMode>,
)
