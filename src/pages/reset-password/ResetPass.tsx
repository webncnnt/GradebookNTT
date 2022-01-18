import { useState } from "react";

import Container from "../../components/layouts/container/Container";
import forgotImage from "../../assets/images/Saly-17.png";
import InputText from "../../components/UI/input/input-text/InputText";
import Button from "../../components/UI/button/Button";
import useHttp from "../../hooks/useHttp";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    ),
});

const ResetPass = () => {
  const [emailEntered, setEmailEntered] = useState<string>("");
  const navigate = useNavigate();

  const { sendRequest } = useHttp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const submitHandle = ({ email }: any) => {
    const requestConfig = {
      url: "auth/forgot",
      method: "POST",
      body: { email },
    };
    const handleError = () => {};

    const handleSuccess = (data: any) => {
      toast("Đã gửi mật khẩu mới vào email của bạn");
      navigate("/login");
    };

    sendRequest(requestConfig, handleError, handleSuccess);
  };

  return (
    <Container>
      <div className="forgot">
        <div className="forgot__img">
          <img src={forgotImage} alt="" />
        </div>
        <div className="forgot__content">
          <h2 className="forgot__title mb2">Quên mật khẩu</h2>

          <p className="forgot__sub-title mb2">Mật khẩu mới sẽ gửi về email của bạn</p>

          <form className="w100" onSubmit={handleSubmit(submitHandle)}>
            <div className="form__group">
              <InputText
                {...register("email")}
                placeholder="Email"
                id="email-forgot-pass"
                validStatus={errors.email !== undefined ? "invalid" : undefined}
                errorText={errors.email?.message}
              />
            </div>

            <div className="form__group">
              <Button btnType="submit" content="Gửi mật khẩu mới" type="primary" fullsize={true} />
            </div>
            <div className="forgot__redirect">
              Quay lại
              <span>
                <Link to="/register"> đăng nhập</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ResetPass;
