import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      navigate("/");
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  if (isLoading) {
    return <><div className="flex items-center justify-center w-full h-screen">
      <span className="loading loading-ring w-3/12"></span></div></>;
  }

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // Optional: render nothing while redirecting
  return null;
}

export default Protected;
