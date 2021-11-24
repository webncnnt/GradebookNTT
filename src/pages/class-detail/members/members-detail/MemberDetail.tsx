import { useEffect, useState } from "react";
import UserInfo from "../../../../components/user-info/UserInfo";

interface memberInfo {
  fullName: string;
  studentId?: number;
  birthday?: string;
  address?: string;
  numberPhone?: string;
  avatar?: string;
  email: string;
  facebook?: string;
}

type memberDetailProps = {
  memberId: number;
};

const MemberDetail = ({ memberId }: memberDetailProps) => {
  const [userInfo, setUserInfo] = useState<memberInfo>({
    fullName: "",
    studentId: 0,
    birthday: "",
    address: "",
    numberPhone: "",
    avatar: "",
    email: "",
    facebook: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessTokenStore = localStorage.getItem("accessToken");
      const googleTokenStore = localStorage.getItem("googleToken");

      let tokenFormat = "";
      if (accessTokenStore) tokenFormat = accessTokenStore;
      if (googleTokenStore) tokenFormat = googleTokenStore;

      if (accessTokenStore) {
        try {
          const res = await fetch(
            "https://classroom.eastasia.cloudapp.azure.com/api/profile/" + memberId,
            {
              headers: {
                Authorization: tokenFormat,
              },
            }
          );
          const result = await res.json();

          if (res.status !== 200) {
            throw new Error(result.message);
          } else {
            const profileFormat = {
              fullName: result.profile.fullname,
              studentId: parseInt(result.profile.studentId),
              birthday: formatDate(formatIsoDateTime(result.profile.dob)),
              address: result.profile.address,
              numberPhone: result.profile.numberPhone,
              avatar: result.profile.avatar,
              email: result.profile.email,
              facebook: result.profile.facebook,
            };
            setUserInfo(profileFormat);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await fetch(
            "https://classroom.eastasia.cloudapp.azure.com/api/profile/" + memberId,
            {
              headers: {
                tokenidgg: tokenFormat,
              },
            }
          );
          const result = await res.json();

          if (res.status !== 200) {
            throw new Error(result.message);
          } else {
            const profileFormat = {
              fullName: result.profile.fullname,
              studentId: parseInt(result.profile.studentId),
              birthday: formatDate(formatIsoDateTime(result.profile.dob)),
              address: result.profile.address,
              numberPhone: result.profile.numberPhone,
              avatar: result.profile.avatar,
              email: result.profile.email,
              facebook: result.profile.facebook,
            };
            setUserInfo(profileFormat);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserInfo();
  }, [memberId]);

  return (
    <>
      <div className="members__detail-avatar">
        <img src={userInfo.avatar} alt="" />
      </div>
      <UserInfo
        fullname={userInfo.fullName}
        studentId={userInfo.studentId}
        birthday={userInfo.birthday}
        address={userInfo.address}
        numberPhone={userInfo.numberPhone}
        email={userInfo.email}
        facebook={userInfo.facebook}
      />
    </>
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

  let year: string | number = newDate.getFullYear();
  let month: string | number = newDate.getMonth() + 1;
  let day: string | number = newDate.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  return year + "-" + month + "-" + day;
};

export default MemberDetail;
