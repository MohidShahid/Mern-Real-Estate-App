import {Auth0Provider } from '@auth0/auth0-react'
import {useNavigate} from 'react-router-dom'



function Auth0ProviderWithRedirect({children}) {
  const navigate = useNavigate();
  const onRedirectCallback = async(appState) => {

   navigate(appState?.returnTo || "/auth-callback");
     
  };
  return (
   <Auth0Provider 
   domain={import.meta.env.VITE_AUTH0_DOMAIN_ID}
   clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
   authorizationParams={{
    redirect_uri : import.meta.env.VITE_AUTH0_REDIRECT_URI,
    audience : import.meta.env.VITE_AUDIENCE_URI
   }}

   onRedirectCallback={onRedirectCallback}
   >
    {children}
   </Auth0Provider>
  )
}

export default Auth0ProviderWithRedirect