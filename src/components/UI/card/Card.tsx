import Status from "./status/Status";

import { useNavigate } from "react-router-dom";
import imgClass from "../../../assets/images/imgClass.png";
import Button from "../button/Button";

const Card = () => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card__side card__side--front">
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

      <div className="card__side card__side--back">
        <div className="card__time">
          <p className="card__time-only">CÒN LẠI</p>
          <p className="card__time-value">89 ngày</p>
        </div>

        <Button content="Vào học ngay" type="secondary" onClick={() => navigate('/class-detail/1/timeline')}/>
      </div>
    </div>
  );
};

export default Card;
