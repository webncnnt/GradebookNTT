import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/layouts/loading/Loading";

const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const ResetPass = lazy(() => import("../pages/reset-password/ResetPass"));
const NotFound = lazy(() => import("../pages/404"));

const UnauthRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ResetPass />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default UnauthRoutes;
