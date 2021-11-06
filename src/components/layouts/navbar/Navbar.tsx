import Button from "../button/Button";
import Menu from "./menu/Menu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Gradebook</div>

      <div className="navbar__menu">
        <Menu />
      </div>

      <div className="navbar__btn-group">
        <Button content="Sign in" type="secondary" />
        <Button content="Sign up" type="primary" />
      </div>
    </nav>
  );
};

export default Navbar;
