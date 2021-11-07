import Popup from "../../popup/Popup";
import Button from "../../button/Button";

const CreateClassForm = () => {
  return (
    <Popup>
      <div className="form">
        <h1 className="form__title">Tạo lớp học</h1>
        <form>
          <div className="form__group">
            <input
              placeholder="Tên lớp"
              type="text"
              id="clsName"
              className="form__input form__input--text"
            />
            <label htmlFor="clsName" className="form__label">
              Tên lớp
            </label>
          </div>

          <div className="form__group">
            <input
              placeholder="Ảnh minh họa"
              type="url"
              id="clsImg"
              className="form__input form__input--text"
            />
            <label htmlFor="clsImg" className="form__label">
              Ảnh minh họa
            </label>
          </div>

          <div className="form__group">
            <input
              placeholder="Mô tả"
              type="text"
              id="clsDesc"
              className="form__input form__input--text"
            />
            <label htmlFor="clsDesc" className="form__label">
              Mô tả
            </label>
          </div>

          {/* <div className="form__group">
            <input type="date" id="expired" className='form__input form__input--date'/>
            <label htmlFor="expired" className='form__label'>Ngày kết thúc</label>
          </div> */}

          <div className="form__group-btn">
            <div className="form__btn">
              <Button content="Tạo" type="primary" />
            </div>
            <div className="form__btn">
              <Button content="Hủy" type="secondary" />
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default CreateClassForm;
