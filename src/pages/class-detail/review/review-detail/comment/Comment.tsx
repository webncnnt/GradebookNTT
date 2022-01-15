import React, { useEffect, useState } from "react";
import InputText from "../../../../../components/UI/input/input-text/InputText";
import { useAuth } from "../../../../../contexts/auth-context";
import useHttp from "../../../../../hooks/useHttp";

interface CommentProps {
  reviewId: number;
  statusTeacher: string;
}

interface CommentInterface {
  message: string;
  commenterName: string;
  commenterAvatar: string;
}

const Comment = ({ reviewId, statusTeacher }: CommentProps) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [listComments, setListComments] = useState<CommentInterface[]>([]);
  const [getComments, setGetComments] = useState<number>(0);

  const { sendRequest } = useHttp();

  const { user } = useAuth();

  // get comments
  useEffect(() => {
    const requestConfig = {
      url: "comment/getAllCommentByReviewId/" + reviewId,
    };
    const handleError = () => {};

    const getListReview = (data: any) => {
      const dataTransform = data.map((comment: any) => {
        return {
          message: comment.message ?? "",
          commenterName: comment.commentername ?? "Nguyễn Văn A",
          commenterAvatar: comment.avatar !== "" ? comment.avatar : "https://i.pinimg.com/550x/19/59/d8/1959d87ad19b535b3ca42a26518c0123.jpg",
        };
      });
      setListComments(dataTransform);
    };
    sendRequest(requestConfig, handleError, getListReview);
  }, [sendRequest, reviewId, getComments]);

  const addCommentHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentInput.trim() !== "") {
      const data = { reviewId: reviewId, message: commentInput, commenterId: user.id };

      const requestConfig = {
        url: "comment/addComment",
        method: "POST",
        body: data,
      };
      const handleError = () => {};

      const getListReview = (data: any) => {};
      sendRequest(requestConfig, handleError, getListReview);
    }
    setCommentInput("");
    setGetComments((cur) => cur + 1);
  };

  return (
    <div className='review-detail review-detail__comment'>
      <h3 className='review-detail__title'>Bình luận</h3>
      <ul>
        {listComments.map((comment, key) => {
          return (
            <li key={key}>
              <div className='review-detail__comment-user'>
                <img src={comment.commenterAvatar} alt='commentAvatar' />
                <div>
                  <span>{comment.commenterName}</span>
                  <p>{comment.message}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {statusTeacher === "NEW" ? (
        <form onSubmit={addCommentHandle}>
          <InputText placeholder='Bình luận' id='review-comment' value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
        </form>
      ) : null}
    </div>
  );
};

export default Comment;
