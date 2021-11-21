import UserItem from "../../pages/user-detail/UserItem/UserItem";
import FacebookCircleIcon from "../icons/FacebookCircle";
import LocationIcon from "../icons/Location";
import MailIcon from "../icons/Mail";
import PhoneIcon from "../icons/Phone";
import ScheduleIcon from "../icons/Schedule";
import UserIcon from "../icons/User";
import UserStarIcon from "../icons/UserStar";

type userInfo = {
  fullname?: string;
  studentId?: number;
  birthday?: string; //dd/mm/yyyy
  address?: string;
  numberPhone?: string;
  email: string;
  facebook?: string;
};

const UserInfo = ({
  fullname,
  studentId,
  birthday,
  address,
  numberPhone,
  email,
  facebook,
}: userInfo) => {

  return (
    <div className="user-info">
      <div className="user-info__group">
        <h3 className="user-info__group-title">Thông tin cá nhân</h3>

        <UserItem icon={<UserIcon />} content={fullname} />
        <UserItem
          icon={<UserStarIcon />}
          content={studentId ? studentId.toString() : ""}
        />
        <UserItem icon={<ScheduleIcon />} content={birthday ? birthday : ""} />
        <UserItem icon={<LocationIcon />} content={address ? address : ""} />
      </div>

      <div className="user-info__group">
        <h3 className="user-info__group-title">Thông tin liên lạc</h3>
        <UserItem
          icon={<PhoneIcon />}
          content={numberPhone ? numberPhone : ""}
        />
        <UserItem icon={<MailIcon />} content={email} />
        <UserItem
          icon={<FacebookCircleIcon />}
          content={facebook ? facebook : ""}
        />
      </div>
    </div>
  );
};

export default UserInfo;
