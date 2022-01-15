import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/auth-context";

type dropdownProps = {
  onClick: () => void;
};

const UserDropDown = ({ onClick }: dropdownProps) => {
  const authCtx = useAuth();
  return (
    <div className='drop-down'>
      <ul className='drop-down__items' onClick={onClick}>
        <li className='drop-down__item'>
          <Link to='/user-detail'>Thông tin cá nhân</Link>
        </li>
        <li className='drop-down__item'>Lớp giảng dạy</li>
        <li className='drop-down__item'>Lớp tham gia</li>
        <li className='drop-down__item' onClick={() => authCtx.onLogout()}>
          Đăng xuất
        </li>
      </ul>
    </div>
  );
};

export default UserDropDown;
