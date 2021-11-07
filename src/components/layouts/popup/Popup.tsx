import { Fragment } from "react";

interface popupProps {
  children: JSX.Element;
}

const Popup = ({ children }: popupProps) => {
  return (
    <Fragment>
      <div className="backdrop" />
      <div className="popup">{children}</div>
    </Fragment>
  );
};

export default Popup;
