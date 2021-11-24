import { useEffect, useState } from "react";

import { CSSTransition } from "react-transition-group";
import AddIcon from "../../components/icons/Add";
import Container from "../../components/layouts/container/Container";
import Card from "../../components/UI/card/Card";
import CreateClassForm from "../../components/UI/form/create-class/CreateClassForm";

interface ClassType {
  id: number;
  clsName: string;
  classImage?: string;
  desc?: string;
  ownerId: number;
  experidDate?: string;
}

const HomeLogged = () => {
  const [listClasses, setListClasses] = useState<ClassType[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  useEffect(() => {
    const fetchApi = async () => {
      const accessTokenStore = localStorage.getItem("accessToken");
      const googleTokenStore = localStorage.getItem("googleToken");

      let tokenFormat = "";
      if (accessTokenStore) tokenFormat = accessTokenStore;
      if (googleTokenStore) tokenFormat = googleTokenStore;

      let resHeaders: HeadersInit;

      if (accessTokenStore) {
        resHeaders = {
          authorization: tokenFormat,
          "Content-Type": "application/json",
        };
      } else {
        resHeaders = {
          tokenidgg: tokenFormat,
          "Content-Type": "application/json",
        };
      }
      try {
        const res = await fetch(
          "https://gradebook.codes/api/classes",
          {
            headers: resHeaders,
          }
        );
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          const dataFormat = result.data.map((item: any) => {
            return {
              id: item.id,
              clsName: item.className,
              classImage: item.coverImage,
              desc: item.description,
              ownerId: item.ownerId,
              experidDate: item.expiredTime,
            };
          });
          setListClasses(dataFormat);
        }
        setIsSubmited(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, [isSubmited]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const setSubmited = () => {
    setIsSubmited(true);
  };

  return (
    <Container>
      <CSSTransition
        in={showPopup}
        timeout={300}
        classNames="popup"
        unmountOnExit
      >
        <CreateClassForm onClose={closePopup} setSubmited={setSubmited} />
      </CSSTransition>

      <div className="homeLogged">
        <div className="homeLogged__header">
          <h1 className="homeLogged__title">Danh sách lớp</h1>
          <div className="navbar__btn">
            <AddIcon className="frame" onClick={() => setShowPopup(true)} />
          </div>
        </div>
        <div className="homeLogged__classes">
          {listClasses.map((cls) => {
            return (
              <Card
                key={cls.id}
                id={cls.id}
                clsName={cls.clsName}
                classImage={cls.classImage}
                desc={cls.desc}
                ownerId={cls.ownerId}
                experidDate={cls.experidDate}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default HomeLogged;
