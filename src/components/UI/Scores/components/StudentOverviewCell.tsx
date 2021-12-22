import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";

type StudentOverviewCellProps = {
  studentName: string;
  userLink?: string;
  avatarUrl?: string;
} & HTMLAttributes<HTMLDivElement>;

const StudentOverviewCell = ({ studentName, avatarUrl, userLink }: StudentOverviewCellProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <img src={avatarUrl} style={{ borderRadius: "50px", width: "4rem", height: "4rem" }} />
      {userLink === undefined ? (
        <div>{studentName}</div>
      ) : (
        <Link style={{ marginLeft: "5px" }} to={userLink}>
          {studentName}
        </Link>
      )}
    </div>
  );
};

export default StudentOverviewCell;
