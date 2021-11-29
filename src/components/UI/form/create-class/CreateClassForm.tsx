import { useState } from "react";
import useHttp from "../../../../hooks/useHttp";
import Button from "../../button/Button";
import InputText from "../../input-text/InputText";
import InputDate from "../../input/input-date/InputDate";
import InputImage from "../../input/input-image/InputImage";
import Popup from "../../popup/Popup";

type popupProps = {
  onClose: () => void;
  setSubmited: () => void;
};

const CreateClassForm = ({ onClose, setSubmited: setSubmitted }: popupProps) => {
  const [clsName, setClsName] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [expiredTime, setExpiredTime] = useState<string>("");
  const {error, sendRequest} = useHttp();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const data = {
      className: clsName,
      coverImage: coverImage,
      description: description,
      expiredTime: expiredTime,
    };

    const requestConfig = {
      url: "classes",
      method: "POST",
      body: data
    }

    const handleError = () => {
     console.log(error);
     setSubmitted();
      onClose();
    }

    const createClassSuccess = (data: any) => {      
      setSubmitted();
      onClose();
    }

    

    if (clsName.trim() !== "") {
      sendRequest(
        requestConfig,
        handleError,
        createClassSuccess
      );
    }
  };

  const changeImage = (src: string) => {
    setCoverImage(src);
  };

  return (
    <Popup>
      <div className="form">
        <h1 className="form__title">Tạo lớp học</h1>
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <InputText
              placeholder="Tên lớp"
              id="class-name"
              onChange={(e) => setClsName(e.target.value)}
              value={clsName}
            />
          </div>

          <div className="form__group">
            <InputText
              placeholder="Mô tả"
              id="clsDesc"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="form__date-file">
            <div className="form__date">
              <InputDate
                name="Ngày kết thúc"
                id="clsExpired"
                onChange={(e) => setExpiredTime(e.target.value)}
                value={expiredTime}
              />
            </div>
            <div className="form__file">
              <label className="form__label form__label--date">
                Ảnh đại diện
              </label>
              <InputImage
                size="3x2"
                direction="row"
                src={coverImage}
                id="class-image"
                changeSrc={changeImage}
              />
            </div>
          </div>

          <div className="form__group-btn">
            <div className="form__btn">
              <Button
                btnType="submit"
                content="Tạo"
                type="primary"
                animate={true}
              />
            </div>
            <div className="form__btn">
              <Button
                btnType="reset"
                content="Hủy"
                type="secondary"
                onClick={onClose}
                animate={true}
              />
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default CreateClassForm;
