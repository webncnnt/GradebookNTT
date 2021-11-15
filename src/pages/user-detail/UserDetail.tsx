import { useState } from "react";
import { Schedule } from "@mui/icons-material";
import FacebookCircleIcon from "../../components/icons/FacebookCircle";
import LocationIcon from "../../components/icons/Location";
import MailIcon from "../../components/icons/Mail";
import PhoneIcon from "../../components/icons/Phone";
import UserIcon from "../../components/icons/User";
import UserStarIcon from "../../components/icons/UserStar";
import Container from "../../components/layouts/container/Container";
import Avatar from "../../components/UI/avatar/Avatar";
import Button from "../../components/UI/button/Button";
import ChangePassForm from "../../components/UI/form/change-password/ChangePassForm";
import InputDate from "../../components/UI/input/input-date/InputDate";
import InputImage from "../../components/UI/input/input-image/InputImage";
import InputText from "../../components/UI/input/input-text/InputText";
import UserItem from "./UserItem/UserItem";

const UserDetail = () => {
  const [fullname, setFullname] = useState<string>("Nguyễn Văn A");
  const [studentId, setStudentId] = useState<string>("18120000");
  const [birthday, setBirthday] = useState<string>("2000-01-01");
  const [address, setAddress] = useState<string>("Quận 1, TP Hồ Chí Minh");
  const [phone, setPhone] = useState<string>("0123 456 789");
  const [facebook, setFacebook] = useState<string>("fb.com/nguyenvana");

  const [isShowChangePassWorForm, setIsShowChangePassWorForm] = useState<boolean>(false);

  const submitEditForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container>
      {isShowChangePassWorForm ? <ChangePassForm onClose={() => setIsShowChangePassWorForm(false)}/> : null}
      
      <div className="user-detail">
        <div className="user-detail__info">
          <div className="user-detail__header">
            <div className="user-detail__avatar">
              <Avatar imageSrc="https://res.cloudinary.com/dtitvei0p/image/upload/v1636946157/upload-img/cdfiqu8sw9gfaaslhs4q.jpg" />
            </div>
            <div className="user-detail__basic-info">
              <div className="user-detail__name">{fullname}</div>
              <div className="user-detail__faculty">
                Khoa công nghệ thông tin
              </div>
            </div>
          </div>

          <div className="user-detail__group">
            <h3 className="user-detail__group-title">Thông tin cá nhân</h3>

            <UserItem icon={<UserIcon />} content={fullname} />
            <UserItem icon={<UserStarIcon />} content={studentId} />
            <UserItem icon={<Schedule />} content={formatDate(birthday)} />
            <UserItem icon={<LocationIcon />} content={address} />
          </div>

          <div className="user-detail__group">
            <h3 className="user-detail__group-title">Thông tin liên lạc</h3>
            <UserItem icon={<PhoneIcon />} content={phone} />
            <UserItem icon={<MailIcon />} content="nguyenvana@gmail.com" />
            <UserItem icon={<FacebookCircleIcon />} content={facebook} />
          </div>

          <Button content="Thay đổi mật khẩu" type="primary" onClick={() => setIsShowChangePassWorForm(true)}/>
        </div>

        <div className="user-detail__edit">
          <h2 className="user-edit__title">Chỉnh sửa thông tin cá nhân</h2>

          <form onSubmit={submitEditForm}>
            <div className="user-detail__edit-content">
              <div className="user-detail__edit-info">
                <div className="form__group">
                  <InputText
                    placeholder="Họ và tên"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <InputText
                    placeholder="MSSV"
                    id="mssv"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <InputDate
                    name="Ngày sinh"
                    id="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <InputText
                    placeholder="Địa chỉ"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <InputText
                    placeholder="Số điện thoại"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <InputText
                    placeholder="Facebook"
                    id="facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              </div>

              <div className="user-detail__edit-avatar">
                <InputImage
                  size="4x5"
                  direction="column"
                  alt="user-avatar"
                  id="user-avatar"
                  src="https://res.cloudinary.com/dtitvei0p/image/upload/v1636946157/upload-img/cdfiqu8sw9gfaaslhs4q.jpg"
                />
              </div>
            </div>

            <div className="form__group-btn">
              <div className="form__btn">
                <Button content="Lưu" type="primary" />
              </div>
              <div className="form__btn">
                <Button content="Hủy" type="fill-red" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

/*
format date: yyyy-mm-dd -> dd/mm/yyyy
input: date: string:  yyyy-mm-dd
output: date: string:  dd/mm/yyyy
*/
const formatDate = (date: string): string => {
  const dateArray = date.split("-");
  dateArray.reverse();
  return dateArray.join("/");
};

export default UserDetail;
