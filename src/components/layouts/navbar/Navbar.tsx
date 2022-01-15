import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useAuth } from "../../../contexts/auth-context";
import SunIcon from "../../icons/Sun";
import Avatar from "../../UI/avatar/Avatar";
import Button from "../../UI/button/Button";
import UserDropDown from "./drop-down/UserDropDown";
import Menu from "./menu/Menu";
import defaultAvt from "../../../assets/images/avatar.jpg";
import useHttp from "../../../hooks/useHttp";

const Navbar = () => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const authCtx = useAuth();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const { id } = authCtx.user;

  useEffect(() => {
    const requestConfig = {
      url: "notification/notificationsOfUser/" + id,
    };
    const handleError = () => {};

    const getListReview = (data: any) => {
      console.log(data);
    };
    sendRequest(requestConfig, handleError, getListReview);
  }, [sendRequest, id]);

  const GoToHome = () => {
    if (authCtx.isLoggedIn) navigate("/listClasses");
    else navigate("/home");
  };

  return (
    <nav className='navbar'>
      <div className='navbar__logo' onClick={GoToHome}>
        Gradebook
      </div>

      <div className='navbar__menu'>
        <Menu />
      </div>
      {authCtx.isLoggedIn ? (
        <div className='navbar__btn-group'>
          <div className='navbar__btn'>
            <SunIcon className='frame' />
          </div>
          <div className='navbar__btn navbar__user'>
            <Avatar imageSrc={authCtx.user.avatar ? authCtx.user.avatar : defaultAvt} onClick={() => setIsShowDropdown((value) => !value)} />
          </div>
        </div>
      ) : (
        <div className='navbar__btn-group'>
          <div className='navbar__btn'>
            <Button
              content='Đăng nhập'
              type='secondary'
              onClick={() => {
                navigate("/login");
              }}
            />
          </div>
          <div className='navbar__btn'>
            <Button
              content='Đăng ký'
              type='primary'
              onClick={() => {
                navigate("/register");
              }}
            />
          </div>
        </div>
      )}
      <CSSTransition in={isShowDropdown} timeout={100} classNames='dropdownTransition' unmountOnExit mountOnEnter>
        <UserDropDown onClick={() => setIsShowDropdown(false)} />
      </CSSTransition>
    </nav>
  );
};

export default Navbar;
