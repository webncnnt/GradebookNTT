import { Routes, Route } from "react-router-dom";

import Layout from "./components/layouts/layout/Layout";
import HomeLogged from "./pages/home-logged/HomeLogged";
import Home from "./pages/home/Home";

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
