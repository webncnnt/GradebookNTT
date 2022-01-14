import { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import { CSVLink } from "react-csv";

import AddIcon from "../../../components/icons/Add";
import UploadIcon from "../../../components/icons/Upload";
import Container from "../../../components/layouts/container/Container";
import InviteMemberForm from "../../../components/UI/form/invite-members/InviteMemberForm";
import UserTable from "../../../components/UI/table/user-table/UserTable";
import useHttp from "../../../hooks/useHttp";
import MemberDetail from "./members-detail/MemberDetail";
import DownloadIcon from "../../../components/icons/Download";
import { StudentModel } from "../../../@types/models/StudentModel";
import { TeacherModel } from "../../../@types/models/TeacherModel";

const csv_headers = [
  { label: "Tên sinh viên", key: "studentName" },
  { label: "MSSV", key: "studentId" },
];
const pathname = window.location.pathname;

const Members = () => {
  const [listTeachers, setListTeachers] = useState<TeacherModel[]>([]);
  const [listStudents, setListStudents] = useState<StudentModel[]>([]);
  const [isShowListTeacher, setIsShowListTeacher] = useState<boolean>(true);
  const [memberIdDetail, setMemberIdDetail] = useState<number>(0);
  const [isShowInviteForm, setIsShowInviteForm] = useState<boolean>(false);
  const [isUploadStudents, setIsUploadStudents] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  const userId = localStorage.getItem("userId");

  const { sendRequest } = useHttp();


  //get teacher
  useEffect(() => {
    const requestConfig = {
      url: "classes/" + pathname.split("/")[2] + "/teachers",
    };
    const handleError = () => {};

    const getTeachers = (data: any) => {
      const memberInfoFormat: TeacherModel[] = data.data.teachers.map((member: any) => {
        return {
          id: member.profile.id,
          fullName: member.profile.fullName,
          avatar: member.profile.avatar,
          email: member.profile.email,
          joinDate: member.joinDate,
        };
      });
      setListTeachers(memberInfoFormat);
    };
    sendRequest(requestConfig, handleError, getTeachers);
  }, [sendRequest]);

  //get student
  useEffect(() => {
    const requestConfig = {
      url: "students/getStudentsByClassId/" + pathname.split("/")[2],
    };
    const handleError = () => {};

    const getStudents = (data: any) => {   
      const memberInfoFormat: StudentModel[] = data.map((member: any) => {
        return {
          id: member.userId,
          fullName: member.fullName,
          studentId: member.studentId,
          avatar: member.avatar,
          email: member.email,
          joinDate: member.createdAt,
        };
      });

      setListStudents(memberInfoFormat);
    };
    sendRequest(requestConfig, handleError, getStudents);
    setIsUploadStudents(false);
  }, [sendRequest, isUploadStudents]);

  //check teacher
  useEffect(() => {
    if (listTeachers.findIndex((teacher) => teacher.id === parseInt(userId ? userId : "")) >= 0) {
      setIsTeacher(true);
    }
  }, [listTeachers, userId]);

  const chooseMember = (id: number) => {
    setMemberIdDetail(id);
  };

  const csv_data = listStudents.map((student) => {
    return {
      studentName: student.fullName,
      studentId: student.studentId,
    };
  });

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  const handleForce = (data: any, fileInfo: any) => {
    if (data[0]["Tên sinh viên"]) {
      const newListStudents = data.map((student: any) => {
        return {
          studentName: student["Tên sinh viên"],
          studentId: student["MSSV"].toString(),
        };
      });

      const requestConfig = {
        url: "students/uploadStudents",
        method: "POST",
        body: {
          students: newListStudents,
          classId: pathname.split("/")[2],
        },
      };
      const handleError = () => {};

      const uploadStudents = (data: any) => {};

      sendRequest(requestConfig, handleError, uploadStudents);

      setIsUploadStudents(true);
    } else {
      console.log("Wrong header");
    }
  };

  return (
    <Container>
      {isShowInviteForm ? <InviteMemberForm onClose={() => setIsShowInviteForm(false)} /> : null}
      <div className='members'>
        <div className='members__content'>
          <div className='members__title-invite'>
            <h1 className='members__title'>Thành viên</h1>
            <AddIcon className='frame' onClick={() => setIsShowInviteForm(true)} />
          </div>
          <div className='members__table'>
            <ul className='members__menu'>
              <li className={"members__menu-item" + (isShowListTeacher ? " active" : "")} onClick={() => setIsShowListTeacher(true)}>
                Giảng viên
              </li>
              <li className={"members__menu-item" + (!isShowListTeacher ? " active" : "")} onClick={() => setIsShowListTeacher(false)}>
                Sinh viên
              </li>
            </ul>
            <div className='members__list'>
              {isShowListTeacher ? (
                <UserTable isStudent={false} listUsers={listTeachers} onChooseMember={chooseMember} memberIdChoose={memberIdDetail} />
              ) : (
                <UserTable isStudent={true} listUsers={listStudents} onChooseMember={chooseMember} memberIdChoose={memberIdDetail} />
              )}
            </div>
            {isTeacher ? (
              <div className='members__downdoad-upload'>
                <div className='members__download'>
                  {!isShowListTeacher ? (
                    <CSVLink data={csv_data} filename={"list-students.csv"} headers={csv_headers}>
                      <DownloadIcon className='btn btn--primary icon--white' />
                    </CSVLink>
                  ) : null}
                  ;
                </div>
                <div className='member__upload'>
                  {!isShowListTeacher ? (
                    <CSVReader
                      cssClass='csv-reader-input'
                      label={<UploadIcon className='btn btn--primary icon--white' />}
                      onFileLoaded={handleForce}
                      parserOptions={papaparseOptions}
                      inputId='listStudents'
                      inputName='listStudents'
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className='members__detail'>
          <MemberDetail memberId={memberIdDetail} />
        </div>
      </div>
    </Container>
  );
};

export default Members;
