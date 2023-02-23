import { useRoutes } from "react-router-dom";
import { useAuth } from "./features/auth/hooks";
import routes from "./routes";

function App() {
  const { isLoggedIn } = useAuth();

  const appRoutes = useRoutes(routes(isLoggedIn));

  return <>{appRoutes}</>;
}

export default App;
