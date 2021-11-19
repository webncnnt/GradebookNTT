import Popup from "../../popup/Popup";
import Button from "../../button/Button";
import { useState } from "react";
import UploadIcon from "../../../icons/Upload";
import Loading from "../../../layouts/loading/Loading";

interface popupProps {
  onClose: () => void;
}

const CreateClassForm = ({ onClose }: popupProps) => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const uploadImageHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();

    if (files) {
      data.append("file", files[0]);
      data.append("upload_preset", "upload-img");

      setLoading(true);

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dtitvei0p/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (!res.ok) return;

        const file = await res.json();

        setImage(file.secure_url);
      } catch (error: any) {
        console.log(error.message);
      }

      setLoading(false);
    }
  };

  return (
    <Popup>
      <div className="form">
        <h1 className="form__title">Tạo lớp học</h1>
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <input
              placeholder="Tên lớp"
              type="text"
              id="clsName"
              className="form__input form__input--text"
            />
            <label htmlFor="clsName" className="form__label form__label--text">
              Tên lớp
            </label>
          </div>

          <div className="form__group">
            <input
              placeholder="Mô tả"
              type="text"
              id="clsDesc"
              className="form__input form__input--text"
            />
            <label htmlFor="clsDesc" className="form__label form__label--text">
              Mô tả
            </label>
          </div>

          <div className="form__date-file">
            <div className="form__date">
              <label
                htmlFor="clsExpired"
                className="form__label form__label--date"
              >
                Ngày kết thúc
              </label>
              <input
                type="date"
                id="clsExpired"
                className="form__input form__input--date"
              />
            </div>
            <div className="form__file">
              <label className="form__label form__label--date">
                Ảnh đại diện
              </label>

              <label htmlFor="clsAvatar">
                <UploadIcon />
              </label>

              <div className="form__avatar">
                {loading ? (
                  <Loading/>
                ) : (
                  <img src={image} alt="Class's avatar" />
                )}
              </div>

              <input
                type="file"
                name="file"
                id="clsAvatar"
                className="form__input form__input--file"
                onChange={uploadImageHandle}
              />
            </div>
          </div>

          <div className="form__group-btn">
            <div className="form__btn">
              <Button content="Tạo" type="primary" />
            </div>
            <div className="form__btn">
              <Button content="Hủy" type="secondary" onClick={onClose} />
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default CreateClassForm;
