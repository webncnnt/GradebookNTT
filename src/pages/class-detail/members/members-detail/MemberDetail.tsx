import { useEffect, useState } from "react";
import UserInfo from "../../../../components/user-info/UserInfo";
import useHttp from "../../../../hooks/useHttp";

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

  const {sendRequest} = useHttp();

  useEffect(() => {
    console.log("Get user profile");
    
    const requestConfig = {
      url: "profile/" + memberId
    }

    const handleError = () => {}

    const getMemberInfo = (data: any) => {      
      const profileFormat = {
        fullName: data.profile.fullname,
        studentId: parseInt(data.profile.studentId),
        birthday: formatDate(formatIsoDateTime(data.profile.dob)),
        address: data.profile.address,
        numberPhone: data.profile.numberPhone,
        avatar: data.profile.avatar,
        email: data.profile.email,
        facebook: data.profile.facebook,
      };
      setUserInfo(profileFormat);
    }

    sendRequest(
      requestConfig,
      handleError,
      getMemberInfo
    );

  }, [memberId, sendRequest]);

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
