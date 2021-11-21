import React from "react";
import Avatar from "../../avatar/Avatar";

const UserTable = () => {
  return (
    <table className="user-table">
      <thead>
        <tr className="user-table__row">
          <th className="user-table__title">Tên</th>
          <th className="user-table__title">Email</th>
          <th className="user-table__title">Ngày tham gia</th>
        </tr>
      </thead>
      <tbody>
        <tr className="user-table__row row-active">
          <td className="user-table__name">
            <Avatar/> <span>Nguyễn Văn A</span> 
          </td>
          <td className="user-table__email">nguyenvana@gmail.com</td>
          <td className="user-table__join-date">20/11/2021</td>
        </tr>
        
        <tr className="user-table__row">
          <td className="user-table__name">
            <Avatar/> <span>Nguyễn Văn A</span> 
          </td>
          <td className="user-table__email">nguyenvana@gmail.com</td>
          <td className="user-table__join-date">20/11/2021</td>
        </tr>
        
        <tr className="user-table__row">
          <td className="user-table__name">
            <Avatar/> <span>Nguyễn Văn A</span> 
          </td>
          <td className="user-table__email">nguyenvana@gmail.com</td>
          <td className="user-table__join-date">20/11/2021</td>
        </tr>
        
        <tr className="user-table__row">
          <td className="user-table__name">
            <Avatar/> <span>Nguyễn Văn A</span> 
          </td>
          <td className="user-table__email">nguyenvana@gmail.com</td>
          <td className="user-table__join-date">20/11/2021</td>
        </tr>
        
        <tr className="user-table__row">
          <td className="user-table__name">
            <Avatar/> <span>Nguyễn Văn A</span> 
          </td>
          <td className="user-table__email">nguyenvana@gmail.com</td>
          <td className="user-table__join-date">20/11/2021</td>
        </tr>
        
        <tr className="user-table__row">
          <td className="user-table__name">
            <Avatar/> <span>Nguyễn Văn A</span> 
          </td>
          <td className="user-table__email">nguyenvana@gmail.com</td>
          <td className="user-table__join-date">20/11/2021</td>
        </tr>
        
      </tbody>
    </table>
  );
};

export default UserTable;
