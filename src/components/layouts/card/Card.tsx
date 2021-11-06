import Status from "./status/Status";

import imgClass from "../../../assets/images/imgClass.png";

const Card = () => {
  return (
    <div className="card">
      <div className="card__head">
        <div className="card__image">
          <img src={imgClass} alt="#" />
        </div>
      </div>

      <div className="card__body">
        <h3 className="card__title">
          Phân tích quản lý yêu cầu phần mềm - 18_3
        </h3>

        <div className="card__teachers">
          <div className="card__teacher">
            Giáo viên: <span>Lâm Quang Vũ</span>
          </div>
          <div className="card__teacher">
            Giáo viên: <span>Trần Duy Anh</span>
          </div>
        </div>

        <div className="card__status">
          <Status content="24/11/2021" status="none" />
          <Status content="24/11/2021" status="coming" />
          <Status content="24/11/2021" status="outdate" />
        </div>
      </div>
    </div>
  );
};

export default Card;
