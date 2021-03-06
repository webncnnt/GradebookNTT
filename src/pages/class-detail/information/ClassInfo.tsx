import { useEffect, useState } from "react";
import Container from "../../../components/layouts/container/Container";
import { GradeStructure } from "../../../components/UI/GradeStructure";
import useHttp from "../../../hooks/useHttp";

const pathname = window.location.pathname;

const ClassInfo = () => {
  const [clsName, setClsName] = useState<string>("");
  const [clsDescription, setClsDescription] = useState<string>("");
  const [clsCode, setClsCode] = useState<string>("");
  const [clsExpired, setClsExpired] = useState<string>("");

  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchApi = async () => {
      const requestConfig = {
        url: "classes/" + pathname.split("/")[2],
      };

      const handleError = () => {};

      const setLogged = (data: any) => {
        setClsCode(data.data.inviteCode);

        setClsName(data.data.className);
        setClsDescription(data.data.description);
        setClsExpired(formatDate(formatIsoDateTime(data.data.expiredTime)));
      };

      sendRequest(requestConfig, handleError, setLogged);
    };

    fetchApi();
  }, [sendRequest]);

  return (
    <Container>
      <div className="class-info">
        <div className="class-info__info">
          <h1 className="class-info__name">{clsName}</h1>
          <div className="class-info__description">{clsDescription}</div>
          <div className="class-info__code">
            Mã tham gia: <span>{clsCode}</span>
          </div>
          <div className="class-info__expired">
            Ngày kết thúc: <span>{clsExpired}</span>
          </div>
        </div>

        <div className="class-info__edit-point-structure">
          <h2 className="class-info__grade-structure__header">Grade Structure</h2>
          <GradeStructure />
        </div>
      </div>
    </Container>
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

export default ClassInfo;
