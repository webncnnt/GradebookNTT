import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../../../components/UI/button/Button";
import InputText from "../../../../../components/UI/input/input-text/InputText";
import { useAuth } from "../../../../../contexts/auth-context";
import useHttp from "../../../../../hooks/useHttp";

interface ChangeScoreProps {
  reviewId: number;
  currentScore: number;
}

const ChangeScore = ({ reviewId, currentScore }: ChangeScoreProps) => {
  const [scoreInput, setScoreInput] = useState<string>("");

  const { sendRequest } = useHttp();
  const { user } = useAuth();

  const submitApproved = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (scoreInput) {
      const data = { userId: user.id, finalScore: parseInt(scoreInput), statusTeacher: "APPROVED" };

      const requestConfig = {
        url: "review/markFinalReview/" + reviewId,
        method: "POST",
        body: data,
      };
      const handleError = () => {
        toast("Không thể thay đổi điểm số");
      };

      const getListReview = (data: any) => {
        toast("Chấp nhận phúc khảo");
      };
      sendRequest(requestConfig, handleError, getListReview);
    }
  };

  const rejectedScore = () => {
    const data = { userId: user.id, finalScore: scoreInput ? parseInt(scoreInput) : currentScore, statusTeacher: "REJECTED" };

    const requestConfig = {
      url: "review/markFinalReview/" + reviewId,
      method: "POST",
      body: data,
    };
    const handleError = () => {
      toast("Không thể thay đổi điểm số");
    };

    const getListReview = (data: any) => {
      toast("Từ chối phúc khảo");
    };
    sendRequest(requestConfig, handleError, getListReview);
  };

  return (
    <div className='review-detail review-detail__form'>
      <h3 className='review-detail__title'>Phúc khảo điểm</h3>
      <form onSubmit={submitApproved}>
        <InputText
          className='mb2'
          placeholder='Điểm phúc khảo'
          id='review-score'
          value={scoreInput}
          onChange={(e) => setScoreInput(e.target.value)}
        />
        <Button onClick={rejectedScore} className='mr4' type='fill-red' content='Từ chối' />
        <Button type='primary' btnType='submit' content='Sửa điểm' />
      </form>
    </div>
  );
};

export default ChangeScore;
