import { useEffect, useState } from "react";

import { CSSTransition } from "react-transition-group";
import AddIcon from "../../components/icons/Add";
import Container from "../../components/layouts/container/Container";
import Card from "../../components/UI/card/Card";
import CreateClassForm from "../../components/UI/form/create-class/CreateClassForm";
import useHttp from "../../hooks/useHttp";

interface ClassType {
  id: number;
  clsName: string;
  classImage?: string;
  desc?: string;
  ownerId: number;
  expiredDate?: string;
}

const HomeLogged = () => {
  const [listClasses, setListClasses] = useState<ClassType[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const {error, sendRequest} = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: "classes",
    }

    const handleError = () => {
     console.log(error);
     
    }

    const getClasses = (data: any) => {      
      const dataFormat = data.data.map((item: any) => {
        return {
          id: item.id,
          clsName: item.className,
          classImage: item.coverImage,
          desc: item.description,
          ownerId: item.ownerId,
          expiredDate: item.expiredTime,
        };
      });
      setListClasses(dataFormat);
    }

    sendRequest(
      requestConfig,
      handleError,
      getClasses
    );
  }, [isSubmitted, error, sendRequest]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const setSubmited = () => {
    setIsSubmitted(true);
  };

  return (
    <Container>
      <CSSTransition
        in={showPopup}
        timeout={300}
        classNames="popup"
        unmountOnExit
      >
        <CreateClassForm onClose={closePopup} setSubmitted={setSubmited} />
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
                expiredDate={cls.expiredDate}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default HomeLogged;
