import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const Timeline = lazy(() => import("../pages/class-detail/timeline/Timeline"));

const UnauthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/class-detail">
          <Route path=":id" element={<Timeline />} />
        </Route>

      </Routes>
    </Suspense>
  );
};

export default UnauthRoutes;
