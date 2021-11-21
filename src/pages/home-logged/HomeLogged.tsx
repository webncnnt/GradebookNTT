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
  teachers?: [{ id: number; fullName: string }];
  experidDate?: string;
}

const HomeLogged = () => {
  const [listClasses, setListClasses] = useState<ClassType[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/classes");
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          const dataFormat = result.data.map((item: any) => {
            return {
              clsName: item.className,
              classImage: item.coverImage,
              teachers: item.teachers,
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
          <h1 className="homeLogged__title">Danh sách lớp học</h1>
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
                teachers={cls.teachers}
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
