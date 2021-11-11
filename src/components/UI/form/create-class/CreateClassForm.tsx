import { FileUpload } from "@mui/icons-material";

import Popup from "../../popup/Popup";
import Button from "../../button/Button";

interface popupProps {
  onClose: () => void;
}

const CreateClassForm = ({ onClose }: popupProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                <FileUpload className="form__icon--upload" />
              </label>

              <div className="form__avatar">
                {/* <img src="#" alt="Class's avatar" /> */}
              </div>

              <input
                type="file"
                id="clsAvatar"
                className="form__input form__input--file"
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
