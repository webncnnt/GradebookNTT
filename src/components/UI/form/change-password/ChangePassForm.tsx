import { useState } from "react";

import Popup from "../../popup/Popup";
import Button from "../../button/Button";
import InputPassword from "../../input/input-password/InputPassword";

interface popupProps {
  onClose: () => void;
}

const ChangePassForm = ({ onClose }: popupProps) => {
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [newPassAgain, setNewPassAgain] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Popup onClose={onClose}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="form">
          <h1 className="form__title">Thay đổi mật khẩu</h1>
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <InputPassword
                label="Mật khẩu cũ"
                id="old-pass"
                onChange={(e) => setOldPass(e.target.value)}
                value={oldPass}
              />
            </div>

            <div className="form__group">
              <InputPassword
                label="Mật khẩu mới"
                id="new-pass"
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
              />
            </div>

            <div className="form__group">
              <InputPassword
                label="Nhập lại mật khẩu mới"
                id="new-pass-again"
                onChange={(e) => setNewPassAgain(e.target.value)}
                value={newPassAgain}
              />
            </div>

            <div className="form__group-btn">
              <div className="form__btn">
                <Button content="Lưu" type="primary" />
              </div>
              <div className="form__btn">
                <Button content="Hủy" type="fill-red" onClick={onClose} />
              </div>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default ChangePassForm;
