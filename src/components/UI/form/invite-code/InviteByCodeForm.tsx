import React, { useState } from "react";
import useHttp from "../../../../hooks/useHttp";
import Button from "../../button/Button";
import InputText from "../../input-text/InputText";
import InputRatio from "../../input/input-ratio/InputRatio";
import Popup from "../../popup/Popup";

type inviteFormProps = {
  onClose: () => void;
};

const InviteByCodeForm = ({ onClose }: inviteFormProps) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [role, setRole] = useState<string>("1");
  const {error, sendRequest} = useHttp();

  const pathname = window.location.pathname;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const data = { email: emailInput, role: parseInt(role) };

    const requestConfig = {
      url: "classes/" +
      pathname.split("/")[2] +
      "/invitations",
      method: "POST",
      body: data
    }

    const handleError = () => {
     console.log(error);
      onClose();
    }

    const inviteClassSuccess = (data: any) => {      
      onClose();
    }
    
      sendRequest(
        requestConfig,
        handleError,
        inviteClassSuccess
      );
    

  };

  return (
    <Popup>
      <div className="form">
        <h1 className="form__title">Mời tham gia</h1>
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <InputText
              placeholder="Email"
              id="email-invite"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <InputRatio role={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="form__group-btn">
            <div className="form__btn">
              <Button btnType="submit" content="Mời" type="primary" />
            </div>
            <div className="form__btn">
              <Button
                btnType="reset"
                content="Huỷ"
                type="fill-red"
                onClick={onClose}
              />
            </div>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default InviteByCodeForm;
