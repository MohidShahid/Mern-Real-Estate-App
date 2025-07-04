import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import authService from '../Services/AuthService'
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

function Auth0Callback() {
      const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
      const navigate = useNavigate();

  useEffect(() => {
    const registerUser = async () => {
      if (isAuthenticated && user?.email) {
        const token = await getAccessTokenSilently();
       const res = await authService.SignupUser(token , user);
        navigate('/')
      }
    };
    registerUser();
  }, [isAuthenticated, user]);
  
return <Loading />;
  
}

export default Auth0Callback