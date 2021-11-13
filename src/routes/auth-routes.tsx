import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomeLogged = lazy(() => import("../pages/home-logged/HomeLogged"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeLogged />} />
        <Route path="/listClasses" element={<HomeLogged />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;