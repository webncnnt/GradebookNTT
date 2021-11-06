import { Fragment } from "react";
import Navbar from "../../layouts/navbar/Navbar";
import Slide from "./slide/Slide";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <Slide />
    </Fragment>
  );
};

export default Home;
