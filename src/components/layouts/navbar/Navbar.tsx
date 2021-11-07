import Button from "../button/Button";
import Icon from "../icon/Icon";
import Menu from "./menu/Menu";
import { Add, Brightness5 } from "@mui/icons-material";

import Avatar from "./avatar/Avatar";
import avtSrc from '../../../assets/images/avt.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Gradebook</div>

      <div className="navbar__menu">
        <Menu />
      </div>

      {/* <div className="navbar__btn-group">
      <div className="navbar__btn">
        <Button content="Sign in" type="secondary" />
        </div>
        <div className="navbar__btn">
        <Button content="Sign up" type="primary" />
        </div>
      </div> */}

      <div className="navbar__btn-group">
        <div className="navbar__btn">
          <Icon icon={<Add className="icon" />} />
        </div>
        <div className="navbar__btn">
          <Icon icon={<Brightness5 className="icon" />} />
        </div>
        <div className="navbar__btn">
          <Icon icon={<Avatar imageSrc={avtSrc}/>} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
