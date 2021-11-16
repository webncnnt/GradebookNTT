import Layout from "./components/layouts/layout/Layout";
import { useAuth } from "./contexts/auth-context";
import AuthRoutes from "./routes/auth-routes";
import UnauthRoutes from "./routes/unauth-routes";

function App() {
  const authCtx = useAuth();
  return (
    <Layout>{authCtx.isLoggedIn ? <AuthRoutes /> : <UnauthRoutes />}</Layout>
  );
}

export default App;
