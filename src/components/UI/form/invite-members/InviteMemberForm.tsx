import React, { useState } from "react";
import Button from "../../button/Button";
import InputText from "../../input-text/InputText";
import InputRatio from "../../input/input-ratio/InputRatio";
import Popup from "../../popup/Popup";

type inviteFormProps = {
  onClose: () => void;
};

const InviteMemberForm = ({ onClose }: inviteFormProps) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [role, setRole] = useState<string>("1");

  const pathname = window.location.pathname;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const data = { email: emailInput, role: parseInt(role) };

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
          "https://classroom.eastasia.cloudapp.azure.com/api/classes/" +
            pathname.split("/")[2] +
            "/invitations",
          {
            method: "POST",
            headers: resHeaders,
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();

        if (res.status !== 201) {
          throw new Error(result.message);
        } else {
          console.log(result.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
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

export default InviteMemberForm;
