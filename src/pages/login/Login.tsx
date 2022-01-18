import { useState } from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/images/Saly-16.png";
import FacebookIcon from "../../components/icons/Facebook";
import GithubIcon from "../../components/icons/Github";
import GoogleIcon from "../../components/icons/Google";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";
import InputPassword from "../../components/UI/input/input-password/InputPassword";
import InputText from "../../components/UI/input/input-text/InputText";
import { useAuth } from "../../contexts/auth-context";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    ),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [emailEntered, setEmailEntered] = useState<string>("");
  const [passwordEntered, setPasswordEntered] = useState<string>("");
  const authCtx = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleSubmitLogin = (data: any) => {
    authCtx.onLogin(data.email, data.password);
  };

  const responseGoogleSuccess = async (response: any) => {
    authCtx.onLoginWithGoogle(response.tokenId);
  };

  const responseGoogleFailure = (response: any) => {
    console.log(response);
  };

  return (
    <Container>
      <div className='login'>
        <div className='login__img'>
          <img src={LoginImage} alt='' />
        </div>
        <div className='login__content'>
          <h2 className='login__title mb2'>Đăng nhập</h2>

          <p className='login__sub-title mb2'>Đăng nhập hệ thống bằng</p>

          <div className='login__group-icon mb2'>
            <GoogleLogin
<<<<<<< HEAD
              clientId="387536783121-sda7d6mg9uk1f4uktmq63tsq0rp62kg5.apps.googleusercontent.com"
              render={(renderProps) => <GoogleIcon className="frame mr4" onClick={renderProps.onClick} />}
=======
              clientId='387536783121-sda7d6mg9uk1f4uktmq63tsq0rp62kg5.apps.googleusercontent.com'
              render={(renderProps) => <GoogleIcon className='frame mr4' onClick={renderProps.onClick} />}
>>>>>>> d572cb8e7f60fee2e115b57c8d6bad88dac4d46f
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookIcon className='frame mr4' />
            <GithubIcon className='frame' />
          </div>

          <div className='login__or mb2'>Hoặc</div>

          <form className="w100" onSubmit={handleSubmit(handleSubmitLogin)}>
            <div className="form__group">
              <InputText
                {...register("email")}
                placeholder="Email"
                id="username"
                validStatus={errors.email !== undefined ? "invalid" : undefined}
                errorText={errors.email?.message}
              />
            </div>
            <div className='form__group'>
              <InputPassword
                {...register("password")}
                placeholder="Mật khẩu"
                id="password"
                validStatus={errors.password !== undefined ? "invalid" : undefined}
                errorText={errors.password?.message}
              />
            </div>

            <div className="login__remember mb2">
              <div className="login__remember-checkbox">
                <input type="checkbox" id="check-remember" name="check-remember" />
                <label htmlFor="check-remember">Ghi nhớ tài khoản</label>
              </div>

              <div className='login__remember-forgot'>
                <Link to='/forgot-password'>Quên mật khẩu</Link>
              </div>
            </div>

            <div className="form__group">
              <Button btnType="submit" content="Đăng nhập" type="primary" fullsize={true} />
            </div>
            <div className="login__redirect">
              Bạn chưa có tài khoản?{" "}
              <span>
                <Link to="/register">Đăng ký</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
