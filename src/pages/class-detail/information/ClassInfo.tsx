import Container from "../../../components/layouts/container/Container";

const ClassInfo = () => {
  return (
    <Container>
      <div className="class-info">
        <h1 className="class-info__name">Phát triển ứng dụng web nâng cao</h1>
        <div className="class-info__description">
          Khoa Công nghệ Thông tin (CNTT) - Trường Đại học Khoa học Tự nhiên,
          ĐHQG-HCM.
        </div>
        <div className="class-info__expired">
            Ngày kết thúc: <span>11/01/2021</span>
        </div>
      </div>
    </Container>
  );
};

export default ClassInfo;
