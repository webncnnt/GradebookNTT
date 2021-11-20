import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avtSrc from "../../../assets/images/avt.png";
import { useAuth } from "../../../contexts/auth-context";
import SunIcon from "../../icons/Sun";
import Avatar from "../../UI/avatar/Avatar";
import Button from "../../UI/button/Button";
import UserDropDown from "./drop-down/UserDropDown";
import Menu from "./menu/Menu";

const Navbar = () => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const authCtx = useAuth();
  const navigate = useNavigate();

  const GoToHome = () => {
    if (authCtx.isLoggedIn) navigate("/listClasses");
    else navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={GoToHome}>
        Gradebook
      </div>

      <div className="navbar__menu">
        <Menu />
      </div>
      {authCtx.isLoggedIn ? (
        <div className="navbar__btn-group">
          <div className="navbar__btn">
            <SunIcon className="frame" />
          </div>
          <div className="navbar__btn navbar__user">
            <Avatar
              imageSrc={avtSrc}
              onClick={() => setIsShowDropdown((value) => !value)}
            />
          </div>
        </div>
      ) : (
        <div className="navbar__btn-group">
          <div className="navbar__btn">
            <Button
              content="Đăng nhập"
              type="secondary"
              onClick={() => {
                navigate("/login");
              }}
            />
          </div>
          <div className="navbar__btn">
            <Button
              content="Đăng ký"
              type="primary"
              onClick={() => {
                navigate("/register");
              }}
            />
          </div>
        </div>
      )}
      {isShowDropdown ? <UserDropDown /> : ""}
    </nav>
  );
};

export default Navbar;
