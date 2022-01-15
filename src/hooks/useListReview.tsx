import { useEffect, useState } from "react";
import useHttp from "./useHttp";

const pathname = window.location.pathname;

const classId = pathname.split("/")[2];

interface ReviewInterface {
  reviewId: number;
  studentName: string;
  studentId: number;
  assignmentName: string;
  assignmentId: number;
  currentScore: number;
  expectedScore: number;
  message: string;
  statusTeacher: string; //new, rejected, approved
  statusStudent: string; //PENDING, REVIEWED
}
const isClassDetail = pathname.indexOf("class-detail") >= 0;

const useListReview = () => {
  const [listReview, setListReview] = useState<ReviewInterface[]>([]);
  const { sendRequest } = useHttp();

  // get list review
  useEffect(() => {
    if (isClassDetail) {
      const requestConfig = {
        url: "review/getListOfReviews/" + classId,
      };
      const handleError = () => {};

      const getListReview = (data: any) => {
        const dataFormat = data.map((review: any) => {
          return {
            reviewId: review.reviewid ?? 0,
            studentName: review.fullName ?? "Nguyễn Văn A",
            studentId: review.studentId ?? 0,
            assignmentName: review.title ?? "Tên cột điểm",
            assignmentId: review.assignmentId ?? 0,
            currentScore: review.currentscore ?? 0,
            expectedScore: review.expectedScore ?? 0,
            message: review.message ?? "Lý do",
            statusTeacher: review.statusTeacher ?? "NEW",
            statusStudent: review.statusStudent ?? "PENDING",
          };
        });

        setListReview(dataFormat.reverse());
      };
      sendRequest(requestConfig, handleError, getListReview);
    }
  }, [sendRequest]);

  return { listReviews: listReview };
};

export default useListReview;
