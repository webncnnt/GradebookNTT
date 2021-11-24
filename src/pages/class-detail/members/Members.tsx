import { useEffect, useState } from "react";
import AddIcon from "../../../components/icons/Add";
import Container from "../../../components/layouts/container/Container";
import InviteMemberForm from "../../../components/UI/form/invite-members/InviteMemberForm";
import UserTable from "../../../components/UI/table/user-table/UserTable";
import MemberDetail from "./members-detail/MemberDetail";

interface memberInfo {
  id: number;
  fullName: string;
  avatar?: string;
  email: string;
  joinDate: string;
}

const Members = () => {
  const [listTeachers, setListTeachers] = useState<memberInfo[]>([]);
  const [listStudents, setListStudents] = useState<memberInfo[]>([]);
  const [isShowListTeacher, setIsShowListTeacher] = useState<boolean>(true);
  const [memberIdDetail, setMemberIdDetail] = useState<number>(0);
  const [isShowInviteForm, setIsShowInviteForm] = useState<boolean>(false);

  const pathname = window.location.pathname;

  useEffect(() => {
    const fetchApi = async () => {
      const accessTokenStore = localStorage.getItem("accessToken");
      const googleTokenStore = localStorage.getItem("googleToken");

      let tokenFormat = "";
      if (accessTokenStore) tokenFormat = accessTokenStore;
      if (googleTokenStore) tokenFormat = googleTokenStore;

      let resHeaders: HeadersInit;

      if (accessTokenStore) {
        resHeaders = {
          authorization: tokenFormat,
          "Content-Type": "application/json",
        };
      } else {
        resHeaders = {
          tokenidgg: tokenFormat,
          "Content-Type": "application/json",
        };
      }

      try {
        const res = await fetch(
          "https://gradebook.codes/api/classes/" +
            pathname.split("/")[2] +
            "/teachers",
          {
            headers: resHeaders,
          }
        );
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          const memberInfoFormat = result.data.teachers.map((member: any) => {
            return {
              id: member.profile.id,
              fullName: member.profile.fullName,
              avatar: member.profile.avatar,
              email: member.profile.email,
              joinDate: member.joinDate,
            };
          });
          setListTeachers(memberInfoFormat);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, [pathname]);

  useEffect(() => {
    const accessTokenStore = localStorage.getItem("accessToken");
      const googleTokenStore = localStorage.getItem("googleToken");

    let tokenFormat = "";
    if (accessTokenStore) tokenFormat = accessTokenStore;
    if (googleTokenStore) tokenFormat = googleTokenStore;

    let resHeaders: HeadersInit;

    if (accessTokenStore) {
      resHeaders = {
        authorization: tokenFormat,
        "Content-Type": "application/json",
      };
    } else {
      resHeaders = {
        tokenidgg: tokenFormat,
        "Content-Type": "application/json",
      };
    }
    const fetchApi = async () => {
      try {
        const res = await fetch(
          "https://gradebook.codes/api/classes/" +
            pathname.split("/")[2] +
            "/students",
          {
            headers: resHeaders,
          }
        );
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          console.log(result.data);
          const memberInfoFormat = result.data.students.map((member: any) => {
            return {
              id: member.profile.id,
              fullName: member.profile.fullName,
              avatar: member.profile.avatar,
              email: member.profile.email,
              joinDate: member.joinDate,
            };
          });
          setListStudents(memberInfoFormat);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, [pathname]);

  const chooseMember = (id: number) => {
    setMemberIdDetail(id);
  };

  return (
    <Container>
      {isShowInviteForm ? (
        <InviteMemberForm onClose={() => setIsShowInviteForm(false)} />
      ) : null}
      <div className="members">
        <div className="members__content">
          <div className="members__title-invite">
            <h1 className="members__title">Thành viên</h1>
            <AddIcon
              className="frame"
              onClick={() => setIsShowInviteForm(true)}
            />
          </div>
          <div className="members__table">
            <ul className="members__menu">
              <li
                className={
                  "members__menu-item" + (isShowListTeacher ? " active" : "")
                }
                onClick={() => setIsShowListTeacher(true)}
              >
                Giảng viên
              </li>
              <li
                className={
                  "members__menu-item" + (!isShowListTeacher ? " active" : "")
                }
                onClick={() => setIsShowListTeacher(false)}
              >
                Học viên
              </li>
            </ul>
            <div className="members__list">
              {isShowListTeacher ? (
                <UserTable
                  listUsers={listTeachers}
                  onChooseMember={chooseMember}
                  memberIdChoose={memberIdDetail}
                />
              ) : (
                <UserTable
                  listUsers={listStudents}
                  onChooseMember={chooseMember}
                  memberIdChoose={memberIdDetail}
                />
              )}
            </div>
          </div>
        </div>
        <div className="members__detail">
          <MemberDetail memberId={memberIdDetail} />
        </div>
      </div>
    </Container>
  );
};

export default Members;
