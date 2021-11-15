import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomeLogged = lazy(() => import("../pages/home-logged/HomeLogged"));
const UserDetail = lazy(() => import("../pages/user-detail/UserDetail"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeLogged />} />
        <Route path="/listClasses" element={<HomeLogged />} />
        <Route path="/user-detail" element={<UserDetail />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
