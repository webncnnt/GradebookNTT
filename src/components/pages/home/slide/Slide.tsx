import Button from "../../../layouts/button/Button";
import Container from "../../../layouts/container/Container";

const Slide = () => {
  return (
    <Container>
      <div className="slide">
        <div className="slide__content">
          <h1 className="slide__header">Learning and teaching everywhere</h1>
          <p className="slide__sub">Learn your way. Teach your way.</p>
          <Button content="Get stated" type="primary" />
        </div>

        <div className="slide__image">
          <img
            src="https://static.remove.bg/remove-bg-web/f50bd6ad4990ff621deccea155ab762c39d8c77a/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
            alt=""
          />
        </div>
      </div>
    </Container>
  );
};

export default Slide;
