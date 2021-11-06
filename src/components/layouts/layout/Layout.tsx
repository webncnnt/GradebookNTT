import { Fragment } from "react";
import Navbar from "../navbar/Navbar";

interface layoutProps {
  children: any;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
};

export default Layout;
