import Button from "../../../components/UI/button/Button";
import Container from "../../../components/layouts/container/Container";
import imgsrc from "../../../assets/images/Saly-10.png";

const Slide = () => {
  return (
    <Container>
      <div className="slide">
        <div className="slide__content">
          <h1 className="slide__header">Dạy và học tập ở bất kì đâu, bất kì lúc nào</h1>
          <p className="slide__sub">Dạy và học theo cách của bạn.</p>
          <Button content="Tham gia ngay" type="primary" animate={true} />
        </div>

        <div className="slide__image">
          <img src={imgsrc} alt="" className="image" />
        </div>
      </div>
    </Container>
  );
};

export default Slide;
