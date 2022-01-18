import { Link } from "react-router-dom";
import RegisterImage from "../../assets/images/Saly-22.png";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";

import InputPassword from "../../components/UI/input/input-password/InputPassword";
import InputText from "../../components/UI/input/input-text/InputText";
import { useAuth } from "../../contexts/auth-context";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required").min(5, "Full name must be at least 5 characters long"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    ),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const authCtx = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const registerSubmitHandle = ({ email, password, fullname }: any) => {
    authCtx.onRegister(email, password, fullname);
  };

  return (
    <Container>
      <div className="register">
        <div className="register__img">
          <img src={RegisterImage} alt="" />
        </div>
        <div className="register__content">
          <h2 className="register__title mb2">Đăng ký</h2>

          <form className="w100" onSubmit={handleSubmit(registerSubmitHandle)}>
            <div className="form__group">
              <InputText
                {...register("email")}
                placeholder="Email"
                id="username_register"
                validStatus={errors.email !== undefined ? "invalid" : undefined}
                errorText={errors.email?.message}
              />
            </div>

            <div className="form__group">
              <InputPassword
                {...register("password")}
                placeholder="Mật khẩu"
                id="password_register"
                validStatus={errors.password !== undefined ? "invalid" : undefined}
                errorText={errors.password?.message}
              />
            </div>

            <div className="form__group">
              <InputPassword
                {...register("passwordConfirm")}
                placeholder="Nhập lại mật khẩu"
                id="password_register-again"
                validStatus={errors.passwordConfirm !== undefined ? "invalid" : undefined}
                errorText={errors.passwordConfirm?.message}
              />
            </div>
            <div className="form__group">
              <InputText
                {...register("fullname")}
                placeholder="Họ và tên"
                id="fullname_register"
                validStatus={errors.fullname !== undefined ? "invalid" : undefined}
                errorText={errors.fullname?.message}
              />
            </div>

            <div className="register__rules mb2">
              <input type="checkbox" id="check-rules" name="check-rules" />
              <label htmlFor="check-rules">
                Tôi đồng ý với các <span>điều khoản</span> của hệ thống
              </label>
            </div>

            <div className="form__group">
              <Button btnType="submit" content="Đăng ký" type="primary" fullsize={true} />
            </div>
            <div className="register__redirect">
              Bạn đã có tài khoản?{" "}
              <span>
                {" "}
                <Link to="/login">Đăng nhập</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
