import { useState } from "react";
import FacebookCircleIcon from "../../components/icons/FacebookCircle";
import LocationIcon from "../../components/icons/Location";
import MailIcon from "../../components/icons/Mail";
import PhoneIcon from "../../components/icons/Phone";
import ScheduleIcon from "../../components/icons/Schedule";
import UserIcon from "../../components/icons/User";
import UserStarIcon from "../../components/icons/UserStar";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";
import ChangePassForm from "../../components/UI/form/change-password/ChangePassForm";
import Icon from "../../components/UI/icon/Icon";
import InputDate from "../../components/UI/input/input-date/InputDate";
import InputImage from "../../components/UI/input/input-image/InputImage";
import InputText from "../../components/UI/input/input-text/InputText";
import { useAuth } from "../../contexts/auth-context";
import UserItem from "./UserItem/UserItem";

const UserDetail = () => {
  const authCtx = useAuth();
  console.log(authCtx.user);
  

  const [fullname, setFullname] = useState<string>(() => {
    return authCtx.user.fullname;
  });
  const [studentId, setStudentId] = useState<string>(() => {
    if (authCtx.user.studentId) return authCtx.user.studentId.toString();
    else return "";
  });
  const [birthday, setBirthday] = useState<string>(() => {
    if (authCtx.user.dob) return formatIsoDateTime(authCtx.user.dob);
    else return "";
  });
  const [address, setAddress] = useState<string>(() => {
    if (authCtx.user.address) return authCtx.user.address;
    else return "";
  });
  const [phone, setPhone] = useState<string>(() => {
    if (authCtx.user.numberPhone) return authCtx.user.numberPhone;
    else return "";
  });
  const [facebook, setFacebook] = useState<string>(() => {
    if (authCtx.user.facebook) return authCtx.user.facebook;
    else return "";
  });
  const [avatar, setAvatar] = useState<string>(() => {
    if (authCtx.user.avatar) return authCtx.user.avatar;
    else return "";
  });

  const [isShowChangePassWorForm, setIsShowChangePassWorForm] =
    useState<boolean>(false);

  const changeImage = (src: string) => {
    setAvatar(src);
  };

  const submitEditForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      fullname: fullname,
      studentId: studentId,
      dob: formatDate(birthday),
      address: address,
      numberPhone: phone,
      avatar: avatar,
      facebook: facebook,
    };
    const accessTokenStore = localStorage.getItem("accessToken");

    let accessTokenFormat = "";
    if (accessTokenStore) accessTokenFormat = accessTokenStore;

    try {
      const res = await fetch(
        "http://localhost:8000/api/profile/" + authCtx.user.id,
        {
          method: "PUT",
          headers: {
            authorization: accessTokenFormat,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (res.status !== 200) {
        throw new Error(result.message);
      } else {
        authCtx.setUser(result.profile.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {isShowChangePassWorForm ? (
        <ChangePassForm onClose={() => setIsShowChangePassWorForm(false)} />
      ) : null}

      <div className="user-detail">
        <div className="user-detail__info">
          <div className="user-detail__header">
            <div className="user-detail__avatar">
              <Icon className="avatar">
                <img
                  src={authCtx.user.avatar ? authCtx.user.avatar : "https://res.cloudinary.com/dtitvei0p/image/upload/v1636946157/upload-img/cdfiqu8sw9gfaaslhs4q.jpg"}
                  alt=""
                />
              </Icon>
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

            <UserItem icon={<UserIcon />} content={authCtx.user.fullname} />
            <UserItem
              icon={<UserStarIcon />}
              content={
                authCtx.user.studentId ? authCtx.user.studentId.toString() : ""
              }
            />
            <UserItem
              icon={<ScheduleIcon />}
              content={
                authCtx.user.dob
                  ? formatDate(formatIsoDateTime(authCtx.user.dob))
                  : ""
              }
            />
            <UserItem
              icon={<LocationIcon />}
              content={authCtx.user.address ? authCtx.user.address : ""}
            />
          </div>

          <div className="user-detail__group">
            <h3 className="user-detail__group-title">Thông tin liên lạc</h3>
            <UserItem
              icon={<PhoneIcon />}
              content={authCtx.user.numberPhone ? authCtx.user.numberPhone : ""}
            />
            <UserItem icon={<MailIcon />} content={authCtx.user.email} />
            <UserItem
              icon={<FacebookCircleIcon />}
              content={authCtx.user.facebook ? authCtx.user.facebook : ""}
            />
          </div>

          <Button
            content="Thay đổi mật khẩu"
            type="primary"
            onClick={() => setIsShowChangePassWorForm(true)}
          />
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
                  src={avatar}
                  changeSrc={changeImage}
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

const formatIsoDateTime = (date: string): string => {
  const newDate = new Date(date);

  let year:string | number = newDate.getFullYear();
  let month:string | number = (newDate.getMonth() + 1);
  let day:string | number = newDate.getDate();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return year + '-' + month + '-' + day;
};

export default UserDetail;
