import { useEffect, useState } from 'react';
import CSVReader from 'react-csv-reader';
import { CSVLink } from 'react-csv';

import AddIcon from '../../../components/icons/Add';
import UploadIcon from '../../../components/icons/Upload';
import Container from '../../../components/layouts/container/Container';
import InviteMemberForm from '../../../components/UI/form/invite-members/InviteMemberForm';
import UserTable from '../../../components/UI/table/user-table/UserTable';
import useHttp from '../../../hooks/useHttp';
import MemberDetail from './members-detail/MemberDetail';
import DownloadIcon from '../../../components/icons/Download';

interface memberInfo {
  id: number;
  fullName: string;
  avatar?: string;
  email: string;
  joinDate: string;
}

const csv_headers = [
  { label: 'Tên', key: 'studentName' },
  { label: 'MSSV', key: 'studentID' },
];

const csv_data = [
  { studentName: 'Ahmed', studentID: '123' },
  { studentName: 'ádg', studentID: '134' },
  { studentName: 'Ahyq3med', studentID: '876' },
];

const Members = () => {
  const [listTeachers, setListTeachers] = useState<memberInfo[]>([]);
  const [listStudents, setListStudents] = useState<memberInfo[]>([]);
  const [isShowListTeacher, setIsShowListTeacher] = useState<boolean>(true);
  const [memberIdDetail, setMemberIdDetail] = useState<number>(0);
  const [isShowInviteForm, setIsShowInviteForm] = useState<boolean>(false);

  const { error, sendRequest } = useHttp();

  const pathname = window.location.pathname;

  useEffect(() => {
    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/teachers',
    };
    const handleError = () => {
      console.log(error);
    };

    const getTeachers = (data: any) => {
      console.log('Get teacher profile');
      const memberInfoFormat = data.data.teachers.map((member: any) => {
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
  }, [pathname, error, sendRequest]);

  useEffect(() => {
    console.log('Get students profile');
    const requestConfig = {
      url: 'classes/' + pathname.split('/')[2] + '/students',
    };
    const handleError = () => {
      console.log(error);
    };

    const getStudents = (data: any) => {
      const memberInfoFormat = data.data.students.map((member: any) => {
        return {
          id: member.profile.id,
          fullName: member.profile.fullName,
          avatar: member.profile.avatar,
          email: member.profile.email,
          joinDate: member.joinDate,
        };
      });
      setListStudents(memberInfoFormat);
    };
    sendRequest(requestConfig, handleError, getStudents);
  }, [pathname, error, sendRequest]);

  const chooseMember = (id: number) => {
    setMemberIdDetail(id);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  const handleForce = (data: any, fileInfo: any) => console.log(data, fileInfo);

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
              <li className={'members__menu-item' + (isShowListTeacher ? ' active' : '')} onClick={() => setIsShowListTeacher(true)}>
                Giảng viên
              </li>
              <li className={'members__menu-item' + (!isShowListTeacher ? ' active' : '')} onClick={() => setIsShowListTeacher(false)}>
                Học viên
              </li>
            </ul>
            <div className='members__list'>
              {isShowListTeacher ? (
                <UserTable listUsers={listTeachers} onChooseMember={chooseMember} memberIdChoose={memberIdDetail} />
              ) : (
                <UserTable listUsers={listStudents} onChooseMember={chooseMember} memberIdChoose={memberIdDetail} />
              )}
            </div>
            <div className='members__downdoad-upload'>
              <div className='members__download'>
                {!isShowListTeacher ? (
                  <CSVLink data={csv_data} filename={'list-students.csv'} headers={csv_headers}>
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
                    inputId='ObiWan'
                    inputName='ObiWan'
                    inputStyle={{ color: 'red' }}
                  />
                ) : null}
              </div>
            </div>
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
