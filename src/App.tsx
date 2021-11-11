import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layouts/layout/Layout";
const Home = lazy(() => import("./pages/home/Home"));
const HomeLogged = lazy(() => import("./pages/home-logged/HomeLogged"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Classroom" element={<HomeLogged />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
