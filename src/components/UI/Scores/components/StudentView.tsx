import { useEffect, useState } from "react";
import { GradeAssignmentModel } from "../../../../@types/models/GradeAssignmentModel";
import useHttp from "../../../../hooks/useHttp";
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

const StudentView = ({ assignments, studentId }: StudentViewProps) => {
  const [scores, setScores] = useState<ScoreInterface[]>([]);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const { sendRequest } = useHttp();

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
                <Button onClick={() => setIsShowForm(true)} content='Phúc khảo' type='primary' />
                {isShowForm ? <RequestReview assignmentId={assignment.id} studentId={studentId} onClose={() => setIsShowForm(false)} /> : null}
              </li>
            );
          })}
          <br />
          <li>
            <span>Tổng kết</span>0
          </li>
        </ul>
      </div>
    </>
  );
};

export default StudentView;
