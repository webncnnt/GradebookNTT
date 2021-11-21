import { useState } from "react";
import Container from "../../../components/layouts/container/Container";
import UserTable from "../../../components/UI/table/user-table/UserTable";
import UserInfo from "../../../components/user-info/UserInfo";

const Members = () => {
  const [isShowTeacherList, setIsShowTeacherList] = useState<boolean>(true);
  return (
    <Container>
      <div className="members">
        <div className="members__content">
          <h1 className="members__title">Thành viên</h1>
          <div className="members__table">
            <ul className="members__menu">
              <li
                className={
                  "members__menu-item" + (isShowTeacherList ? " active" : "")
                }
                onClick={() => setIsShowTeacherList(true)}
              >
                Giảng viên
              </li>
              <li
                className={
                  "members__menu-item" + (!isShowTeacherList ? " active" : "")
                }
                onClick={() => setIsShowTeacherList(false)}
              >
                Học viên
              </li>
            </ul>
            <div className="members__list">
              {isShowTeacherList ? <UserTable /> : <UserTable />}
            </div>
          </div>
        </div>
        <div className="members__detail">
          <div className="members__detail-avatar">
            <img
              src="https://res.cloudinary.com/dtitvei0p/image/upload/v1636946157/upload-img/cdfiqu8sw9gfaaslhs4q.jpg"
              alt=""
            />
          </div>
          <UserInfo fullname="Nguyễn Văn A" email="nguyenvana@gmail.com" />
        </div>
      </div>
    </Container>
  );
};

export default Members;
