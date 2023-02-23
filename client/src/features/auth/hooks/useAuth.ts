import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuth = () => {
  const values = useContext(AuthContext);
  if (!values) throw new Error("Auth context not defined");
  return values;
};

export default useAuth;
