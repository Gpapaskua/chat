import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface IAuthContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
}

interface IAuthContextProvider {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [token, setToken] = useState("");
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(token),
        setToken,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
