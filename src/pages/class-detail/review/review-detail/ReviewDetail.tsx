import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Container from "../../../../components/layouts/container/Container";
import InputText from "../../../../components/UI/input/input-text/InputText";

import useHttp from "../../../../hooks/useHttp";

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
  const [reviewDetail, setReviewDetail] = useState<ReviewDetailInterface>(initialReviewData);
  const [commentInput, setCommentInput] = useState<string>("");
  const { sendRequest } = useHttp();
  const location = useLocation();
  const { reviewId } = location.state;

  // get review detail
  useEffect(() => {
    const requestConfig = {
      url: "review/gradeReviewDetail/" + reviewId,
    };
    const handleError = () => {};

    const getListReview = (data: any) => {
      const dataFormat = {
        reviewId: data.reviewid ?? 0,
        studentName: data.studentName ?? "Nguyễn Văn A",
        studentId: data.studentId ?? 0,
        assignmentName: data.title ?? "Tên cột điểm",
        assignmentId: data.assignmentId ?? 0,
        currentScore: data.currentScore ?? 0,
        expectedScore: data.expectedScore ?? 0,
        message: data.message ?? "Lý do",
        statusTeacher: data.statusTeacher ?? "NEW",
      };
      setReviewDetail(dataFormat);
    };
    sendRequest(requestConfig, handleError, getListReview);
  }, [sendRequest, reviewId]);

  return (
    <Container>
      <div className='review-detail review-detail__info'>
        <h3 className='review-detail__title'>Thông tin phúc khảo:</h3>
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
      <div className='review-detail review-detail__comment'>
        <h3 className=''>Bình luận</h3>
        <InputText placeholder='Bình luận' id='review-comment' value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
      </div>
    </Container>
  );
};

export default ReviewDetail;
