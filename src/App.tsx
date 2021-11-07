import { Routes, Route } from "react-router-dom";

import Layout from "./components/layouts/layout/Layout";
import HomeLogged from "./components/pages/home-logged/HomeLogged";
import Home from "./components/pages/home/Home";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Classroom" element={<HomeLogged />} />
      </Routes>
    </Layout>
  );
}

export default App;
