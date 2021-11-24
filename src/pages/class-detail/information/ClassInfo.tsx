import { useEffect, useState } from "react";
import Container from "../../../components/layouts/container/Container";

const ClassInfo = () => {
  const [clsName, setClsName] = useState<string>("");
  const [clsDescription, setClsDescription] = useState<string>("");
  const [clsExpired, setClsExpired] = useState<string>("");

  const pathname = window.location.pathname;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(
          "https://classroom.eastasia.cloudapp.azure.com/api/classes/" +
            pathname.split("/")[2]
        );
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          setClsName(result.data.className);
          setClsDescription(result.data.description);
          setClsExpired(formatDate(formatIsoDateTime(result.data.expiredTime)));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, [pathname]);

  return (
    <Container>
      <div className="class-info">
        <h1 className="class-info__name">{clsName}</h1>
        <div className="class-info__description">{clsDescription}</div>
        <div className="class-info__expired">
          Ngày kết thúc: <span>{clsExpired}</span>
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
