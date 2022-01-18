import NotFoundImage from "../../assets/images/404.png";

const NotFound = () => {
  return (
    <div className='not-found'>
      <img src={NotFoundImage} alt='#' className='not-found__img' />
    </div>
  );
};

export default NotFound;
