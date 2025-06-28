import { Route , Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Auth0Callback from './Pages/Auth0Callback'
import Profile from './Pages/Profile'
import PostProperty from './Pages/PostProperty'
import Properties from './Pages/Properties'
import Protected from './Pages/Protected'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} /> 
        <Route path="/profile" element={<Protected><Profile /></Protected>} />   
        <Route path='/login' element={<Login />} /> 
        <Route path='/signup' element={<Signup />} />
        <Route path='/postproperty' element={<Protected><PostProperty /></Protected> } />
        <Route path='/listings' element={<Protected><Properties /></Protected>} />
        <Route path='/auth-callback' element={<Auth0Callback />} />
        <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes