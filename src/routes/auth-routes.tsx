import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomeLogged = lazy(() => import("../pages/home-logged/HomeLogged"));
const UserDetail = lazy(() => import("../pages/user-detail/UserDetail"));
const Timeline = lazy(() => import("../pages/class-detail/timeline/Timeline"));
const Classwork = lazy(
  () => import("../pages/class-detail/classwork/Classwork")
);
const Members = lazy(() => import("../pages/class-detail/members/Members"));
const ClassInfo = lazy(
  () => import("../pages/class-detail/information/ClassInfo")
);

const AuthRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeLogged />} />

        <Route path="/listClasses" element={<HomeLogged />} />

        <Route path="/user-detail" element={<UserDetail />} />
        <Route path="/class-detail">
          <Route path=":id">
            <Route path="timeline" element={<Timeline />} />
            <Route path="classwork" element={<Classwork />} />
            <Route path="members" element={<Members />} />
            <Route path="info" element={<ClassInfo />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
