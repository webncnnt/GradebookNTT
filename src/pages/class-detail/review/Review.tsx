import { useEffect, useState } from "react";
import Container from "../../../components/layouts/container/Container";
import useHttp from "../../../hooks/useHttp";
import ReviewItem from "./review-item/ReviewItem";

const pathname = window.location.pathname;

const classId = pathname.split("/")[2];

interface ReviewInterface {
  studentName: string;
  studentId: number;
  assignmentName: string;
  assignmentId: number;
  currentScore: number;
  expectedScore: number;
  message: string;
  statusTeacher: string; //new, rejected, approved
}

const Review = () => {
  const [listReview, setListReview] = useState<ReviewInterface[]>([]);
  const { sendRequest } = useHttp();

  // get list review
  useEffect(() => {
    const requestConfig = {
      url: "review/getListOfReviews/" + classId,
    };
    const handleError = () => {};

    const getListReview = (data: any) => {
      const dataFormat = data.map((review: any) => {
        return {
          studentName: review.studentName ?? "Nguyễn Văn A",
          studentId: review.studentId ?? 0,
          assignmentName: review.title ?? "Tên cột điểm",
          assignmentId: review.assignmentId ?? 0,
          currentScore: review.currentScore ?? 0,
          expectedScore: review.expectedScore ?? 0,
          message: review.message ?? "Lý do",
          statusTeacher: review.statusTeacher ?? "NEW",
        };
      });
      setListReview(dataFormat);
    };
    sendRequest(requestConfig, handleError, getListReview);
  }, [sendRequest]);

  return (
    <Container>
      <h1 className='review__title'>Danh sách phúc khảo</h1>
      <div className=''>
        <div className=''>
          {listReview.map((review, key) => {
            return (
              <ReviewItem
                key={key}
                studentName={review.studentName}
                studentId={review.studentId}
                assignmentName={review.assignmentName}
                assignmentId={review.assignmentId}
                currentScore={review.currentScore}
                expectedScore={review.expectedScore}
                message={review.message}
                statusTeacher={review.statusTeacher}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Review;
