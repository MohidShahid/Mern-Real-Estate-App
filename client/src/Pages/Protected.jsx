import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
function Protected({children}) {
    const {isAuthenticated, user , isLoading} = useAuth0();
    const navigate = useNavigate();
    
    if (!isAuthenticated && !user){
        navigate("/");
    }else{
       return isLoading ? (<span className="loading loading-ring loading-xl"></span>) : (<>{children}</>)
    }
}

export default Protected