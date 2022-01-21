import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";
import useHttp from "../../hooks/useHttp";

const Invite = () => {
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const pathname = window.location.pathname.substring(1);
  const query = window.location.search;
  console.log("32213546");

  const onInviteHandle = () => {
    const requestConfig = {
      url: pathname + query,
      method: "POST",
    };

    const handleError = () => {
      toast("Tham gia lớp học thất bại");
    };

    const inviteClassSuccess = (data: any) => {
      toast("Tham gia lớp học thành công");
      navigate("/listClasses");
    };

    sendRequest(requestConfig, handleError, inviteClassSuccess);
  };

  return (
    <Container>
      <div className='invite'>
        <h1 className='invite__title'>Bạn có muốn tham gia vào lớp không</h1>

        <Button content='Tham gia' type='primary' onClick={onInviteHandle} />
      </div>
    </Container>
  );
};

export default Invite;
