import { useLocation, redirect, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";

export function RequireAuth({ children }) {
  const location = useLocation();
  const { authStatus } = useAuthenticator((context) => [context.route]);
  // maybe add loading widget if authStatus === "configuring"

  console.log("authStatus: " + authStatus)

  if (authStatus !== "authenticated") {
    console.log("authenticating...")
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
