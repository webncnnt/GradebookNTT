import { useEffect, useState } from "react";
import Avatar from "../../avatar/Avatar";
import Pagination from "../../pagination/Pagination";

interface user {
  id: number;
  fullName: string;
  avatar?: string;
  email: string;
  joinDate: string;
}

type userTableProps = {
  listUsers: user[];
  onChooseMember: (id: number) => void;
  memberIdChoose: number;
};

const MEMBERS_PER_PAGE = 6;

const UserTable = ({
  listUsers,
  onChooseMember,
  memberIdChoose,
}: userTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listMembersPerPage, setListMembersPerPage] = useState<user[]>([]);

  useEffect(() => {
    let listMembersInCurrentPage: user[] = [];
    if (listUsers.length > 0) {
      listMembersInCurrentPage = listUsers.slice(
        (currentPage - 1) * MEMBERS_PER_PAGE,
        currentPage * MEMBERS_PER_PAGE
      );
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
    <div className="table">
      <table className="user-table">
        <thead>
          <tr className="user-table__row">
            <th className="user-table__title">Tên</th>
            <th className="user-table__title">Email</th>
            <th className="user-table__title">Ngày tham gia</th>
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
                  className={
                    "user-table__row" +
                    (memberIdChoose === user.id ? " row-active" : "")
                  }
                  key={user.id}
                  onClick={() => chooseMemberHandle(user.id)}
                >
                  <td className="user-table__name">
                    <Avatar imageSrc={user.avatar} />{" "}
                    <span>{user.fullName}</span>
                  </td>
                  <td className="user-table__email">{user.email}</td>
                  <td className="user-table__join-date">
                    {formatDate(formatIsoDateTime(user.joinDate))}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <Pagination
        totalItem={listUsers.length}
        itemPerPage={MEMBERS_PER_PAGE}
        pageActive={currentPage}
        setPageActive={onChangeCurrentPage}
      />
    </div>
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

export default UserTable;
