import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import Status from "./status/Status";
import defaultClassImg from "../../../assets/images/imgClass2.png"

type cardProps = {
  id: number;
  clsName: string;
  classImage?: string;
  desc?: string;
  ownerId: number;
  experidDate?: string;
};

const Card = ({ id, clsName, classImage,desc, ownerId, experidDate }: cardProps) => {
  const [owner, setOwner] = useState<string>("");
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const accessTokenStore = localStorage.getItem("accessToken");
    const googleTokenStore = localStorage.getItem("googleToken");

    let tokenFormat = "";
    if (accessTokenStore) tokenFormat = accessTokenStore;
    if (googleTokenStore) tokenFormat = googleTokenStore;

    const fetchApi = async () => {
      let resHeaders: HeadersInit;
      if (accessTokenStore) {
        resHeaders = {
          authorization: tokenFormat,
        }
      } else {
        resHeaders = {
          tokenidgg: tokenFormat,
        }
      }

      try {
        const res = await fetch(
          "https://gradebook.codes/api/profile/" + ownerId,
          {
            headers: resHeaders,
          }
        );
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          setOwner(result.profile.fullname);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, [ownerId]);

  return (
    <div className="card">
      <div className="card__side card__side--front">
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
          onClick={() => navigate("/class-detail/" + id + "/timeline")}
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
