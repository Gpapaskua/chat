import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks";

interface IRequireAuthProps {
  children: ReactNode;
}

const RequireAuth = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default RequireAuth;
