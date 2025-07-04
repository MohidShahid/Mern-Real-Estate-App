import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

function Protected({ children }) {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      navigate("/");
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  if (isLoading) {
    return <><Loading /></>;
  }

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // Optional: render nothing while redirecting
  return null;
}

export default Protected;
