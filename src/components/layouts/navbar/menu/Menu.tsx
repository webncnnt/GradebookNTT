import { useContext } from "react";
import AuthContext from "../../../../contexts/auth-context";
import Item from "./item/Item";

const Menu = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return (
      <ul className="menu">
        <Item content="Trang chủ" link="home" />
        <Item content="Về chúng tôi" link="about-us" />
      </ul>
    );
  } else {
    return (
      <ul className="menu">
        <Item content="Danh sách lớp" link="listClasses" />
        <Item content="Lịch học" link="schedule" />
      </ul>
    );
  }
};

export default Menu;
