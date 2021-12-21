import { useEffect, useState } from 'react';
import { StudentModel } from '../../../../@types/models/StudentModel';
import { TeacherModel } from '../../../../@types/models/TeacherModel';
import Avatar from '../../avatar/Avatar';
import Pagination from '../../pagination/Pagination';

type user = TeacherModel | StudentModel;

type userTableProps = {
  listUsers: user[];
  onChooseMember: (id: number) => void;
  memberIdChoose: number;
  isStudent: boolean;
};

const MEMBERS_PER_PAGE = 6;

const UserTable = ({ listUsers, onChooseMember, memberIdChoose, isStudent }: userTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listMembersPerPage, setListMembersPerPage] = useState<user[]>([]);

  useEffect(() => {
    let listMembersInCurrentPage: user[] = [];
    if (listUsers.length > 0) {
      listMembersInCurrentPage = listUsers.slice((currentPage - 1) * MEMBERS_PER_PAGE, currentPage * MEMBERS_PER_PAGE);
    }
    setListMembersPerPage(listMembersInCurrentPage);
  }, [currentPage, listUsers]);

  const chooseMemberHandle = (id: number) => {
    onChooseMember(id);
  };

  const onChangeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className='table'>
      <table className='user-table'>
        <thead>
          <tr className='user-table__row'>
            {isStudent ? (
              <>
                <th className='user-table__title'>Tên sinh viên</th>
                <th className='user-table__title'>MSSV</th>
                <th className='user-table__title'>Ngày tham gia</th>
              </>
            ) : (
              <>
                <th className='user-table__title'>Tên đăng nhập</th>
                <th className='user-table__title'>Email</th>
                <th className='user-table__title'>Ngày tham gia</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {listMembersPerPage.length === 0 ? (
            <tr>
              <td>Không có thành viên nào</td>
            </tr>
          ) : (
            listMembersPerPage.map((user) => {
              return (
                <tr
                  className={'user-table__row' + (memberIdChoose === user.id ? ' row-active' : '')}
                  key={user.id ? user.id : (user as StudentModel).studentId}
                  onClick={() => chooseMemberHandle(user.id)}
                >
                  {isStudent ? (
                    <>
                      <td className='user-table__name'>
                        {user.fullName ? (
                          <>
                            <Avatar imageSrc={user.avatar} /> <span>{(user as StudentModel).fullName}</span>
                          </>
                        ) : (
                          (user as StudentModel).studentName
                        )}
                      </td>
                      <td className='user-table__student-id'>{(user as StudentModel).studentId}</td>
                      <td className='user-table__join-date'>{formatDate(formatIsoDateTime(user.joinDate ? user.joinDate : ''))}</td>
                    </>
                  ) : (
                    <>
                      <td className='user-table__name'>
                        {user.fullName ? (
                          <>
                            <Avatar imageSrc={user.avatar} /> <span>{user.fullName}</span>
                          </>
                        ) : null}
                      </td>
                      <td className='user-table__email'>{user.email}</td>
                      <td className='user-table__join-date'>{formatDate(formatIsoDateTime(user.joinDate ? user.joinDate : ''))}</td>
                    </>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <Pagination totalItem={listUsers.length} itemPerPage={MEMBERS_PER_PAGE} pageActive={currentPage} setPageActive={onChangeCurrentPage} />
    </div>
  );
};

/*
format date: yyyy-mm-dd -> dd/mm/yyyy
input: date: string:  yyyy-mm-dd
output: date: string:  dd/mm/yyyy
*/
const formatDate = (date: string): string => {
  if (date.trim() === '') return '';
  const dateArray = date.split('-');
  dateArray.reverse();
  return dateArray.join('/');
};

const formatIsoDateTime = (date: string): string => {
  if (date.trim() === '') return '';
  const newDate = new Date(date);

  let year: string | number = newDate.getFullYear();
  let month: string | number = newDate.getMonth() + 1;
  let day: string | number = newDate.getDate();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  return year + '-' + month + '-' + day;
};

export default UserTable;
