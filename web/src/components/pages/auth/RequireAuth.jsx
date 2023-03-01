import { Navigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";

export function RequireAuth({ children }) {
  const location = useLocation();
  const { authStatus } = useAuthenticator((context) => [context.route]);
  // maybe add loading widget if authStatus === "configuring"

  if (authStatus !== "authenticated") {
    console.log("authenticating...")
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return children;
}
