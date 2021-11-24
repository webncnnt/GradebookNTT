import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";
import InputText from "../../components/UI/input-text/InputText";

const InviteByCodeForm = () => {
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const onInviteByCodeFormHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        const res = await fetch("https://gradebook.codes/api/invites/" + code, {
          method: "POST",
          headers: resHeaders,
        });
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          navigate("/listClasses");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
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
