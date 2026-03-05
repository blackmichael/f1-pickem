import { Navigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import config from "config";

export function RequireAuth({ children }) {
  const location = useLocation();
  
  // In demo mode, always consider the user authenticated
  if (config.isDemoMode) {
    return children;
  }
  
  const { authStatus } = useAuthenticator((context) => [context.route]);
  // maybe add loading widget if authStatus === "configuring"

  if (authStatus !== "authenticated") {
    console.log("authenticating...")
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return children;
}
