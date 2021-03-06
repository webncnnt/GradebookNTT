import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/layouts/loading/Loading";

const HomeLogged = lazy(() => import("../pages/home-logged/HomeLogged"));
const InviteByCodeForm = lazy(() => import("../pages/enroll-class/EnrollClassByCode"));
const UserDetail = lazy(() => import("../pages/user-detail/UserDetail"));
const Timeline = lazy(() => import("../pages/class-detail/timeline/Timeline"));
const Classwork = lazy(() => import("../pages/class-detail/classwork/Classwork"));
const Members = lazy(() => import("../pages/class-detail/members/Members"));
const ClassInfo = lazy(() => import("../pages/class-detail/information/ClassInfo"));
const Review = lazy(() => import("../pages/class-detail/review/Review"));
const ReviewDetail = lazy(() => import("../pages/class-detail/review/review-detail/ReviewDetail"));
const Invite = lazy(() => import("../pages/invite/Invite"));
const Grades = lazy(() => import("../pages/class-detail/grades"));
const NotFound = lazy(() => import("../pages/404"));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<HomeLogged />} />

        <Route path='/listClasses' element={<HomeLogged />} />

        <Route path='/enrollClass' element={<InviteByCodeForm />} />

        <Route path='/user-detail' element={<UserDetail />} />
        <Route path='/class-detail'>
          <Route path=':id'>
            <Route path='timeline' element={<Timeline />} />
            <Route path='classwork' element={<Classwork />} />
            <Route path='members' element={<Members />} />
            <Route path='info' element={<ClassInfo />} />
            <Route path='scores' element={<Grades />} />
            <Route path='review'>
              <Route index element={<Review />} />
              <Route path=':reviewId' element={<ReviewDetail />} />
            </Route>
          </Route>
        </Route>

        <Route path='invites/access_token/:token' element={<Invite />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
