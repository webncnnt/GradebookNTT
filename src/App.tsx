import { toast, ToastContainer } from "react-toastify";
import Layout from "./components/layouts/layout/Layout";
import { useAuth } from "./contexts/auth-context";
import AuthRoutes from "./routes/auth-routes";
import UnauthRoutes from "./routes/unauth-routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const authCtx = useAuth();
  return (
    <>
      <Layout>{authCtx.isLoggedIn ? <AuthRoutes /> : <UnauthRoutes />} </Layout>
      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
