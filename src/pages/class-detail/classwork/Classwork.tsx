import Container from "../../../components/layouts/container/Container";
import ClassworkItem from "./Item/ClassworkItem";

const Classwork = () => {
  return (
    <Container>
      <div className="classwork">
        <h1 className="classwork__title">Tuần 1</h1>
        <ClassworkItem
          title="Kiểm tra giữa kì"
          commentCount={12}
          deadline="25/11/2021"
          type="assignment"
        />
        <ClassworkItem
          title="Kiểm tra giữa kì"
          commentCount={12}
          deadline="20/11/2021"
          type="assignment"
        />
        <h1 className="classwork__title">Tuần 2</h1>
        <ClassworkItem
          title="Kiểm tra giữa kì"
          commentCount={12}
          deadline="24/11/2021"
          type="assignment"
        />
        <ClassworkItem
          title="Kiểm tra giữa kì"
          commentCount={12}
          deadline="20/11/2021"
          type="assignment"
        />
        <h1 className="classwork__title">Tuần 3</h1>
        <ClassworkItem
          title="Kiểm tra giữa kì"
          commentCount={12}
          deadline="24/11/2021"
          type="assignment"
        />
        <ClassworkItem
          title="Kiểm tra giữa kì"
          commentCount={12}
          deadline="24/11/2021"
          type="assignment"
        />
      </div>
    </Container>
  );
};

export default Classwork;
