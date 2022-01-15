import Container from "../../../components/layouts/container/Container";
import useListReview from "../../../hooks/useListReview";
import ReviewItem from "./review-item/ReviewItem";


const Review = () => {
  const { listReviews } = useListReview();

  return (
    <Container>
      <h1 className='review__title'>Danh sách phúc khảo</h1>
      <div className=''>
        <div className=''>
          {listReviews.map((review, key) => {
            return (
              <ReviewItem
                key={key}
                reviewId={review.reviewId}
                studentName={review.studentName}
                studentId={review.studentId}
                assignmentName={review.assignmentName}
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
