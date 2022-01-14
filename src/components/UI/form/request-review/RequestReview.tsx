import { useState } from "react";
import useHttp from "../../../../hooks/useHttp";
import Button from "../../button/Button";
import InputText from "../../input/input-text/InputText";

import Popup from "../../popup/Popup";

interface RequestReviewProps {
  onClose: () => void;
  studentId: number;
  assignmentId: number;
}

const RequestReview = ({ onClose, studentId, assignmentId }: RequestReviewProps) => {
  console.log(studentId, assignmentId);

  const [expectedScore, setExpectedScore] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { sendRequest } = useHttp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { studentId: studentId, assignmentId: assignmentId, expectedScore: expectedScore, message: message };

    const requestConfig = {
      url: "reviewer/requestReview",
      method: "POST",
      body: data,
    };

    const handleError = () => {
      onClose();
    };

    const inviteClassSuccess = (data: any) => {
      onClose();
    };

    sendRequest(requestConfig, handleError, inviteClassSuccess);
  };

  return (
    <Popup>
      <div className='form'>
        <h1 className='form__title'>Đơn phúc khảo</h1>
        <form onSubmit={handleSubmit}>
          <div className='form__group'>
            <InputText placeholder='Điểm số mong muốn' id='expected-score' value={expectedScore} onChange={(e) => setExpectedScore(e.target.value)} />
            <InputText placeholder='Lý do' id='message' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className='form__group-btn'>
            <div className='form__btn'>
              <Button btnType='submit' content='Gửi' type='primary' />
            </div>
            <div className='form__btn'>
              <Button btnType='reset' content='Huỷ' type='fill-red' onClick={onClose} />
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default RequestReview;
