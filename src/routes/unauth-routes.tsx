import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../pages/login/Login"));
const UserDetail = lazy(() => import("../pages/user-detail/UserDetail"));

const UnauthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-detail" element={<UserDetail />} />
      </Routes>
    </Suspense>
  );
};

export default UnauthRoutes;
