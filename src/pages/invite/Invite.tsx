import { useNavigate } from "react-router-dom";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";

const Invite = () => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;
  const query = window.location.search;
  
  
  const onInviteHandle = () => {

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
        const res = await fetch("https://gradebook.codes/api" + pathname + query, {
          method: "POST",
          headers: resHeaders,
        });
        const result = await res.json();

        if (res.status !== 201) {
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
      <div className="invite">
        <h1 className="invite__title">Bạn có muốn tham gia vào lớp không</h1>

        <Button content="Tham gia" type="primary" onClick={onInviteHandle} />
      </div>
    </Container>
  );
};

export default Invite;
