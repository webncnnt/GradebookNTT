import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import Status from "./status/Status";

type cardProps = {
  id: number;
  clsName: string;
  classImage?: string;
  teachers?: [{ id: number; fullName: string }];
  experidDate?: string;
};

const Card = ({id, clsName, classImage, teachers, experidDate }: cardProps) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card__side card__side--front">
        <div className="card__head">
          <div className="card__image">
            <img src={classImage} alt="#" />
          </div>
        </div>

        <div className="card__body">
          <h3 className="card__title">{clsName}</h3>

          <div className="card__teachers">
            {teachers?.map((teacher) => {
              return (
                <div className="card__teacher" key={teacher.id}>
                  Giáo viên: <span>{teacher.fullName}</span>
                </div>
              );
            })}
          </div>

          <div className="card__status">
            {experidDate ? (
              <Status
                content={formatDate(formatIsoDateTime(experidDate))}
                status="none"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="card__side card__side--back">
        <div className="card__time">
          <p className="card__time-only">CÒN LẠI</p>
          <p className="card__time-value">89 ngày</p>
        </div>

        <Button
          content="Vào học ngay"
          type="secondary"
          onClick={() => navigate("/class-detail/" + id +"/timeline")}
        />
      </div>
    </div>
  );
};

/*
format date: yyyy-mm-dd -> dd/mm/yyyy
input: date: string:  yyyy-mm-dd
output: date: string:  dd/mm/yyyy
*/
const formatDate = (date: string): string => {
  const dateArray = date.split("-");
  dateArray.reverse();
  return dateArray.join("/");
};

const formatIsoDateTime = (date: string): string => {
  const newDate = new Date(date);

  let year: string | number = newDate.getFullYear();
  let month: string | number = newDate.getMonth() + 1;
  let day: string | number = newDate.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  return year + "-" + month + "-" + day;
};

export default Card;
