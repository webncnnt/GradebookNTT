import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/layouts/loading/Loading";


const HomeLogged = lazy(() => import("../pages/home-logged/HomeLogged"));
const UserDetail = lazy(() => import("../pages/user-detail/UserDetail"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<HomeLogged />} />
        <Route path="/listClasses" element={<HomeLogged />} />
        <Route path="/user-detail" element={<UserDetail />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
