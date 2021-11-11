import { Brightness5 } from "@mui/icons-material";

import avtSrc from '../../../assets/images/avt.png';
import Icon from '../../UI/icon/Icon';
import Avatar from "./avatar/Avatar";
import Menu from "./menu/Menu";


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
