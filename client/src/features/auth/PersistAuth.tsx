import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, useRefreshToken } from "./hooks";

const IS_DEV = import.meta.env.DEV;

const PersistAuth = () => {
  const { refreshToken, isError, isSuccess } = useRefreshToken();
  const { setToken, token, isLoggedIn } = useAuth();
  const effectRan = useRef(false);

  useEffect(() => {
    if (!isLoggedIn && IS_DEV && effectRan.current === true) {
      console.log(isLoggedIn, effectRan.current);
      refreshToken(undefined, {
        onSuccess: ({ accessToken }) => {
          setToken(accessToken);
        },
      });
    }
    return () => {
      effectRan.current = true;
    };
  }, [refreshToken, setToken]);

  if (isSuccess && token) {
    return <Outlet />;
  }

  if (isError) {
    return <Navigate to="/auth" />;
  }

  return <div>loading...</div>;
};

export default PersistAuth;
