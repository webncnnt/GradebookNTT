import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../../assets/images/Saly-16.png";
import FacebookIcon from "../../components/icons/Facebook";
import GithubIcon from "../../components/icons/Github";
import GoogleIcon from "../../components/icons/Google";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";
import InputPassword from "../../components/UI/input/input-password/InputPassword";
import InputText from "../../components/UI/input/input-text/InputText";
import AuthContext from "../../contexts/auth-context";

const Login = () => {
  const [emailEntered, setEmailEntered] = useState<string>("");
  const [passwordEntered, setPasswordEntered] = useState<string>("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  let emailIsValid = false;
  let passIsValid = false;

  const loginSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmited(true);

    if (emailEntered.trim() !== "") emailIsValid = true;
    if (passwordEntered.trim() !== "") passIsValid = true;

    if (emailIsValid && passIsValid) {
      authCtx.onLogin(emailEntered, passwordEntered);
    }

    if (authCtx.isLoggedIn) {
      console.log(authCtx.message, authCtx.user);
      navigate("/listClasses");
    }
  };

  return (
    <Container>
      <div className="login">
        <div className="login__img">
          <img src={LoginImage} alt="" />
        </div>
        <div className="login__content">
          <h2 className="login__title mb2">Đăng nhập</h2>

          <p className="login__sub-title mb2">Đăng nhập hệ thống bằng</p>

          <div className="login__group-icon mb2">
            <GoogleIcon className="frame mr4" />
            <FacebookIcon className="frame mr4" />
            <GithubIcon className="frame" />
          </div>

          <div className="login__or mb2">Hoặc</div>

          <form className="w100" onSubmit={loginSubmitHandle}>
            <div className="form__group">
              <InputText
                placeholder="Email"
                id="username"
                value={emailEntered}
                onChange={(e) => setEmailEntered(e.target.value)}
                validStatus={
                  isSubmited ? (emailIsValid ? "valid" : "invalid") : undefined
                }
              />
            </div>
            <div className="form__group">
              <InputPassword
                placeholder="Mật khẩu"
                id="password"
                value={passwordEntered}
                onChange={(e) => setPasswordEntered(e.target.value)}
                validStatus={
                  isSubmited ? (passIsValid ? "valid" : "invalid") : undefined
                }
              />
            </div>

            <div className="login__remember mb2">
              <div className="login__remember-checkbox">
                <input
                  type="checkbox"
                  id="check-remember"
                  name="check-remember"
                />
                <label htmlFor="check-remember">Ghi nhớ tài khoản</label>
              </div>

              <div className="login__remember-forgot">Quên mật khẩu?</div>
            </div>

            <div className="form__group">
              <Button content="Đăng nhập" type="primary" fullsize={true} />
            </div>
            <div className="login__redirect">
              Bạn chưa có tài khoản? <span>Đăng ký</span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
