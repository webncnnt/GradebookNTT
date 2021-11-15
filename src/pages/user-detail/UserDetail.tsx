import Container from "../../components/layouts/container/Container";
import Avatar from "../../components/UI/avatar/Avatar";
import avtImage from "../../assets/images/avatar.jpg";
import UserIcon from "../../components/icons/User";
import UserItem from "./UserItem/UserItem";
import UserStarIcon from "../../components/icons/UserStar";
import ScheduleIcon from "../../components/icons/Schedule";
import LocationIcon from "../../components/icons/Location";
import PhoneIcon from "../../components/icons/Phone";
import MailIcon from "../../components/icons/Mail";
import FacebookCircleIcon from "../../components/icons/FacebookCircle";
import Button from "../../components/UI/button/Button";
import InputText from "../../components/UI/input/input-text/InputText";
import InputDate from "../../components/UI/input/input-date/InputDate";

const UserDetail = () => {
  return (
    <Container>
      <div className="user-detail">
        <div className="user-detail__info">
          <div className="user-detail__header">
            <div className="user-detail__avatar">
              <Avatar imageSrc={avtImage} />
            </div>
            <div className="user-detail__basic-info">
              <div className="user-detail__name">Nguyễn Văn A</div>
              <div className="user-detail__faculty">
                Khoa công nghệ thông tin
              </div>
            </div>
          </div>

          <div className="user-detail__group">
            <h3 className="user-detail__group-title">Thông tin cá nhân</h3>
            {listItemPersonal.map((item, key) => {
              return (
                <UserItem key={key} icon={item.icon} content={item.content} />
              );
            })}
          </div>

          <div className="user-detail__group">
            <h3 className="user-detail__group-title">Thông tin liên lạc</h3>
            {listItemContact.map((item, key) => {
              return (
                <UserItem key={key} icon={item.icon} content={item.content} />
              );
            })}
          </div>

          <Button content="Thay đổi mật khẩu" type="primary" />
        </div>

        <div className="user-detail__edit">
          <h2 className="user-edit__title">Chỉnh sửa thông tin cá nhân</h2>

          <form>
            <div className="form__content">
              <div className="form__edit-info">
                <div className="form__group">
                  <InputText placeholder="Họ và tên" id="fullname" />
                </div>

                <div className="form__group">
                  <InputText placeholder="MSSV" id="mssv" />
                </div>

                <div className="form__group">
                  <InputDate name="Ngày sinh" id="birthday" />
                </div>

                <div className="form__group">
                  <InputText placeholder="Địa chỉ" id="address" />
                </div>

                <div className="form__group">
                  <InputText placeholder="Số điện thoại" id="phone" />
                </div>

                <div className="form__group">
                  <InputText placeholder="Facebook" id="facebook" />
                </div>
              </div>
              <div className="form__edit-avatar">
                
              </div>
            </div>

            <div className="form__group-btn">
              <div className="form__btn">
                <Button content="Lưu" type="primary" />
              </div>
              <div className="form__btn">
                <Button content="Hủy" type="secondary" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

type item = {
  icon: JSX.Element;
  content: string;
};

const listItemPersonal: item[] = [
  {
    icon: <UserIcon />,
    content: "Nguyễn Văn A",
  },
  {
    icon: <UserStarIcon />,
    content: "18120000",
  },
  {
    icon: <ScheduleIcon />,
    content: "01/01/2000",
  },
  {
    icon: <LocationIcon />,
    content: "Quận 1, TP Hồ Chí Minh",
  },
];

const listItemContact: item[] = [
  {
    icon: <PhoneIcon />,
    content: "0123 456 789",
  },
  {
    icon: <MailIcon />,
    content: "nguyenvana@gmail.com",
  },
  {
    icon: <FacebookCircleIcon />,
    content: "fb.com/nguyenvana",
  },
];

export default UserDetail;
