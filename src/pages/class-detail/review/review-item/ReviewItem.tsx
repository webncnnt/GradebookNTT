import { useNavigate } from "react-router";

interface ReviewItemProps {
  reviewId: number;
  studentName: string;
  studentId: number;
  assignmentName: string;
  currentScore: number;
  expectedScore: number;
  message: string;
  statusTeacher: string;
}

const ReviewItem = ({ reviewId, studentName, studentId, assignmentName, currentScore, expectedScore, message, statusTeacher }: ReviewItemProps) => {
  const navigate = useNavigate();

  const statusVn = statusTeacher === "NEW" ? "Mới" : statusTeacher === "REJECTED" ? "Từ chối" : "Chấp nhận";
  return (
    <div className={"review-item " + statusTeacher} onClick={() => navigate(`${reviewId}`, { state: { reviewId: reviewId } })}>
      <h3>
        Cột điểm: <span>{assignmentName}</span>
      </h3>
      <p>
        Học sinh:
        <span>
          {studentName} - {studentId}
        </span>
      </p>
      <p>
        Điểm số hiện tại: <span>{currentScore}</span>
      </p>
      <p>
        Điểm số mong muốn: <span>{expectedScore}</span>
      </p>
      <p>
        Lý do: <span>{message}</span>
      </p>
      <p>
        Trạng thái: <span>{statusVn}</span>
      </p>
    </div>
  );
};

export default ReviewItem;
