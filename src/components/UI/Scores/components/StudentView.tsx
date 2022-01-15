import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GradeAssignmentModel } from "../../../../@types/models/GradeAssignmentModel";
import useHttp from "../../../../hooks/useHttp";
import useListReview from "../../../../hooks/useListReview";
import Button from "../../button/Button";
import RequestReview from "../../form/request-review/RequestReview";

type StudentViewProps = {
  assignments: GradeAssignmentModel[];
  studentId: number;
};

interface ScoreInterface {
  score: number;
  title: string;
}

interface ReviewStudentInterface {
  reviewId: number;
  assignmentId: number;
  statusStudent: string;
}

const pathname = window.location.pathname;
const pathnameArray = pathname.split("/");
pathnameArray.pop();
const pathnameClass = pathnameArray.join("/");

const StudentView = ({ assignments, studentId }: StudentViewProps) => {
  const [scores, setScores] = useState<ScoreInterface[]>([]);
  const [myReviews, setMyReviews] = useState<ReviewStudentInterface[]>([]);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [currAssignmentId, setCurrAssignmentId] = useState<number>(0);
  const { sendRequest } = useHttp();

  const navigate = useNavigate();

  const { listReviews } = useListReview();

  // get my review
  useEffect(() => {
    const data = listReviews.filter((review) => {
      return review.studentId === studentId;
    });

    const dataFormat = data.map((item) => {
      return {
        reviewId: item.reviewId,
        assignmentId: item.assignmentId,
        statusStudent: item.statusStudent,
      };
    });
    setMyReviews(dataFormat);
  }, [listReviews, studentId]);

  // scores
  useEffect(() => {
    const requestConfig = {
      url: `reviewer/gradeDetail/${studentId}`,
    };

    const handleError = () => {};

    const handleSuccess = (data: any) => {
      const scoreTransform = data[0].map((item: any) => {
        return {
          title: item.title,
          score: item.score,
        };
      });
      setScores(scoreTransform);
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  }, [sendRequest, studentId]);

  return (
    <>
      <div className='scores__private'>
        <ul>
          <li>
            <span>Tên bài tập</span>Điểm số
          </li>
          <br />
          {assignments.map((assignment, key) => {
            return (
              <li key={key}>
                <span>{assignment.title}:</span> <span> {scores[scores.findIndex((score) => score.title === assignment.title)]?.score ?? 0}</span>
                <Button
                  onClick={() => {
                    if (myReviews.findIndex((review) => review.assignmentId === assignment.id) < 0) {
                      setCurrAssignmentId(assignment.id);
                      setIsShowForm(true);
                    } else {
                      const reviewId = myReviews[myReviews.findIndex((review) => review.assignmentId === assignment.id)].reviewId;
                      navigate(`${pathnameClass}/review/${reviewId}`, { state: { reviewId: reviewId } });
                    }
                  }}
                  content={
                    myReviews.findIndex((review) => review.assignmentId === assignment.id) < 0
                      ? "Phúc khảo"
                      : myReviews[myReviews.findIndex((review) => review.assignmentId === assignment.id)].statusStudent === "PENDING"
                      ? "Đang phúc khảo"
                      : "Đã phúc khảo"
                  }
                  type='primary'
                />
              </li>
            );
          })}
          <br />
          <li>
            <span>Tổng kết</span>0
          </li>
        </ul>
        {isShowForm ? <RequestReview assignmentId={currAssignmentId} studentId={studentId} onClose={() => setIsShowForm(false)} /> : null}
      </div>
    </>
  );
};

export default StudentView;
