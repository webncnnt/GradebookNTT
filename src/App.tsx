import { useContext } from "react";
import Layout from "./components/layouts/layout/Layout";
import AuthContext from "./contexts/auth-context";
import AuthRoutes from "./routes/auth-routes";
import UnauthRoutes from "./routes/unauth-routes";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>{authCtx.isLoggedIn ? <AuthRoutes /> : <UnauthRoutes />}</Layout>
  );
}

export default App;
