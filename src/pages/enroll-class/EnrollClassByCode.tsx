import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";
import InputText from "../../components/UI/input/input-text/InputText";

import useHttp from "../../hooks/useHttp";

const InviteByCodeForm = () => {
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();
  const {error, sendRequest} = useHttp();

  const onInviteByCodeFormHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestConfig = {
      url: "invites/" + code,
      method: "POST"
    }

    const handleError = () => {
     console.log(error);
    }

    const enrollClassSuccess = (data: any) => {      
      navigate("/listClasses");
    }

    sendRequest(
      requestConfig,
      handleError,
      enrollClassSuccess
    );
  };

  return (
    <Container>
      <div className="invite-code">
        <h1 className="invite-code__title">Nhập mã lớp học để tham gia</h1>

        <form className="w100" onSubmit={onInviteByCodeFormHandle}>
          <InputText
            id="invite-class-by-code"
            placeholder="Mã lớp"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Button btnType="submit" content="Tham gia" type="primary" />
        </form>
      </div>
    </Container>
  );
};

export default InviteByCodeForm;
