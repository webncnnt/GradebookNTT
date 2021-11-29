import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Status from "./status/Status";
import defaultClassImg from "../../../assets/images/imgClass2.png";
import useHttp from "../../../hooks/useHttp";

type cardProps = {
  id: number;
  clsName: string;
  classImage?: string;
  desc?: string;
  ownerId: number;
  expiredDate?: string;
};

const Card = ({
  id,
  clsName,
  classImage,
  desc,
  ownerId,
  expiredDate,
}: cardProps) => {
  const [owner, setOwner] = useState<string>("");
  const navigate = useNavigate();
  const {error, sendRequest} = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: "profile/" + ownerId,
    }

    const handleError = () => {
     console.log(error);
    }

    const getOwner = (data: any) => {      
      setOwner(data.profile.fullname);
    }

    sendRequest(
      requestConfig,
      handleError,
      getOwner
    );
  }, [ownerId, error, sendRequest]);

  return (
    <div className="card" onClick={() => navigate("/class-detail/" + id + "/timeline")}>
      <div className="card__box">
      <div className="card__head">
          <div className="card__image">
            <img src={classImage ? classImage : defaultClassImg} alt="#" />
          </div>
        </div>

        <div className="card__body">
          <h3 className="card__title">{clsName}</h3>
          <p className="card__desc">{desc}</p>
          <div className="card__teachers">
            <div className="card__teacher">
              Người tạo: <span>{owner}</span>
            </div>
          </div>

          <div className="card__status">
            {expiredDate ? (
              <Status
                content={formatDate(formatIsoDateTime(expiredDate))}
                status="none"
              />
            ) : null}
          </div>
        </div>
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
