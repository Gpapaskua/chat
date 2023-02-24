import axiosClient from "@/config/axiosConfig";
import { useAuth, useRefreshToken } from "@/features/auth/hooks";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
}

const AxiosWrapper: FC<Props> = ({ children }) => {
  const { token, setToken } = useAuth();
  const { refreshTokenAsync } = useRefreshToken();
  const [isSet, setIsSet] = useState(false);
  const actualToken = useRef(token);

  useEffect(() => {
    /** Add token to request */
    const requestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
      if (config?.headers) {
        config.headers["Authorization"] = "Bearer " + actualToken.current;
      }
      return config;
    };

    const requestErrorInterceptor = (error: AxiosError) => {
      return Promise.resolve(error);
    };

    const requestInterceptor = axiosClient.interceptors.request.use(
      requestSuccessInterceptor,
      requestErrorInterceptor
    );

    return () => {
      /** Eject interceptors */
      axiosClient.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  useEffect(() => {
    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const { accessToken } = await refreshTokenAsync();
          actualToken.current = accessToken;
          setToken(accessToken);
          return axiosClient(originalRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosClient.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshTokenAsync, setToken]);

  useEffect(() => {
    setIsSet(true);
  }, [isSet]);
  return <>{isSet && children}</>;
};

export default AxiosWrapper;
