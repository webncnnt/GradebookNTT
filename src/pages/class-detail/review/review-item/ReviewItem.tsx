interface ReviewDetailProps {
  studentName: string;
  studentId: number;
  assignmentName: string;
  assignmentId: number;
  currentScore: number;
  expectedScore: number;
  message: string;
  statusTeacher: string;
}

const ReviewItem = ({
  studentName,
  studentId,
  assignmentName,
  assignmentId,
  currentScore,
  expectedScore,
  message,
  statusTeacher,
}: ReviewDetailProps) => {
  return (
    <div className={"review-detail " + statusTeacher}>
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
    </div>
  );
};

export default ReviewItem;
