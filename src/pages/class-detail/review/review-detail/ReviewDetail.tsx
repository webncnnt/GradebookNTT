import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Container from "../../../../components/layouts/container/Container";
import useHttp from "../../../../hooks/useHttp";
import useIsTeacher from "../../../../hooks/useIsTeacher";
import ChangeScore from "./change-score/ChangeScore";
import Comment from "./comment/Comment";

interface ReviewDetailInterface {
  reviewId: number;
  studentName: string;
  studentId: number;
  assignmentName: string;
  currentScore: number;
  expectedScore: number;
  message: string;
  statusTeacher: string;
}

const initialReviewData = {
  reviewId: 0,
  studentName: "",
  studentId: 0,
  assignmentName: "",
  currentScore: 0,
  expectedScore: 0,
  message: "",
  statusTeacher: "",
};

const ReviewDetail = () => {
  const location = useLocation();
  const { reviewId } = location.state;

  const [reviewDetail, setReviewDetail] = useState<ReviewDetailInterface>(initialReviewData);
  const { sendRequest } = useHttp();

  // get review detail
  useEffect(() => {
    const requestConfig = {
      url: "review/gradeReviewDetail/" + reviewId,
    };
    const handleError = () => {};

    const getListReview = (data: any) => {
      const dataFormat = {
        reviewId: data[0].reviewid ?? 0,
        studentName: data[0].fullName ?? "Nguyễn Văn A",
        studentId: data[0].studentId ?? 0,
        assignmentName: data[0].title ?? "Tên cột điểm",
        assignmentId: data[0].assignmentId ?? 0,
        currentScore: data[0].currentscore ?? 0,
        expectedScore: data[0].expectedScore ?? 0,
        message: data[0].message ?? "Lý do",
        statusTeacher: data[0].statusTeacher ?? "NEW",
      };

      setReviewDetail(dataFormat);
    };
    sendRequest(requestConfig, handleError, getListReview);
  }, [sendRequest, reviewId]);

  const { isTeacher } = useIsTeacher();

  return (
    <Container>
      <div className='review-detail review-detail__info'>
        <h3 className='review-detail__title'>Thông tin phúc khảo</h3>
        <p>
          Cột điểm: <span>{reviewDetail.assignmentName}</span>
        </p>
        <p>
          Học sinh:
          <span>
            {reviewDetail.studentName} - {reviewDetail.studentId}
          </span>
        </p>
        <p>
          Điểm số hiện tại: <span>{reviewDetail.currentScore}</span>
        </p>
        <p>
          Điểm số mong muốn: <span>{reviewDetail.expectedScore}</span>
        </p>
        <p>
          Lý do: <span>{reviewDetail.message}</span>
        </p>
      </div>
      {isTeacher && reviewDetail.statusTeacher === "NEW" ? <ChangeScore reviewId={reviewId} currentScore={reviewDetail.currentScore} /> : null}

      <Comment reviewId={reviewId} />
    </Container>
  );
};

export default ReviewDetail;
