import { useContext } from "react";
import { Brightness5 } from "@mui/icons-material";

import AuthContext from "../../../contexts/auth-context";
import Button from "../../UI/button/Button";
import Menu from "./menu/Menu";
import Icon from "../../UI/icon/Icon";
import Avatar from "../../UI/avatar/Avatar";
import avtSrc from "../../../assets/images/avt.png";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  

  return (
    <nav className="navbar">
      <div className="navbar__logo">Gradebook</div>

      <div className="navbar__menu">
        <Menu />
      </div>
      {authCtx.isLoggedIn ? (
        <div className="navbar__btn-group">
          <div className="navbar__btn">
            <Icon>
              <Brightness5 className="icon" />
            </Icon>
          </div>
          <div className="navbar__btn">
            <Icon>
              <Avatar imageSrc={avtSrc} />
            </Icon>
          </div>
        </div>
      ) : (
        <div className="navbar__btn-group">
          <div className="navbar__btn">
            <Button content="Đăng nhập" type="secondary" />
          </div>
          <div className="navbar__btn">
            <Button content="Đăng ký" type="primary" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
