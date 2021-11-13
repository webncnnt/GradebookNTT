import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import Icon from "../../components/UI/icon/Icon";
import Container from "../../components/layouts/container/Container";
import InputText from "../../components/UI/input-text/InputText";
import LoginImage from "../../assets/images/Saly-16.png";
import Button from "../../components/UI/button/Button";

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
      navigate('/homeLogged');
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
            <Icon mr4={true}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 8H17.533C17.577 8.385 17.6 8.78 17.6 9.184C17.6 11.918 16.62 14.22 14.922 15.784C13.437 17.155 11.404 17.959 8.98 17.959C7.80067 17.9595 6.63279 17.7276 5.54311 17.2766C4.45344 16.8256 3.46333 16.1642 2.62936 15.3303C1.7954 14.4965 1.13394 13.5064 0.682779 12.4168C0.231619 11.3272 -0.000393388 10.1593 8.91745e-07 8.98C-0.000524813 7.80058 0.231391 6.63262 0.682492 5.54288C1.13359 4.45314 1.79503 3.46298 2.62901 2.62901C3.46298 1.79503 4.45314 1.13359 5.54288 0.682492C6.63262 0.231391 7.80058 -0.000524813 8.98 8.91745e-07C11.4 8.91745e-07 13.433 0.890001 14.988 2.339L13.526 3.8C12.368 2.681 10.803 2 9 2C8.08075 2 7.1705 2.18106 6.32122 2.53284C5.47194 2.88463 4.70026 3.40024 4.05025 4.05025C3.40024 4.70026 2.88463 5.47194 2.53284 6.32122C2.18106 7.1705 2 8.08075 2 9C2 9.91925 2.18106 10.8295 2.53284 11.6788C2.88463 12.5281 3.40024 13.2997 4.05025 13.9497C4.70026 14.5998 5.47194 15.1154 6.32122 15.4672C7.1705 15.8189 8.08075 16 9 16C12.526 16 15.144 13.392 15.577 10H9V8Z"
                  fill="#09121F"
                />
              </svg>
            </Icon>
            <Icon mr4={true}>
              <svg
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7H10.5L10 9H6V18H4V9H0V7H4V5.128C4 3.345 4.186 2.698 4.534 2.046C4.87501 1.40181 5.40181 0.875009 6.046 0.534C6.698 0.186 7.345 0 9.128 0C9.65 0 10.108 0.0500001 10.5 0.15V2H9.128C7.804 2 7.401 2.078 6.99 2.298C6.686 2.46 6.46 2.686 6.298 2.99C6.078 3.401 6 3.804 6 5.128V7Z"
                  fill="#0351CE"
                />
              </svg>
            </Icon>
            <Icon>
              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.88301 16.653C3.58301 16.453 3.32501 16.198 3.02301 15.837C2.86625 15.6452 2.71092 15.4522 2.55701 15.258C2.09401 14.683 1.80201 14.418 1.50001 14.309C1.25031 14.2194 1.04645 14.0342 0.933267 13.7943C0.820089 13.5543 0.806867 13.2792 0.896511 13.0295C0.986154 12.7798 1.17132 12.576 1.41127 12.4628C1.65122 12.3496 1.92631 12.3364 2.17601 12.426C2.92801 12.696 3.43701 13.161 4.12301 14.014C4.02901 13.897 4.46301 14.441 4.55601 14.553C4.74601 14.78 4.88601 14.918 4.99601 14.991C5.20001 15.128 5.58301 15.187 6.14601 15.131C6.16901 14.749 6.24001 14.378 6.34801 14.036C3.38001 13.31 1.70001 11.396 1.70001 7.64002C1.70001 6.40002 2.07001 5.28402 2.75801 4.34802C2.54001 3.45402 2.57301 2.37302 3.06001 1.15602C3.11528 1.01836 3.20048 0.894714 3.30945 0.794052C3.41841 0.693389 3.54841 0.618231 3.69001 0.574023C3.77101 0.550023 3.81701 0.539023 3.89801 0.527023C4.70101 0.404023 5.83501 0.697023 7.31301 1.62302C8.19381 1.41711 9.09546 1.31375 10 1.31502C10.912 1.31502 11.818 1.41902 12.684 1.62302C14.161 0.690023 15.297 0.397023 16.106 0.527023C16.191 0.540023 16.263 0.557023 16.324 0.577023C16.4628 0.6228 16.5899 0.698457 16.6964 0.798666C16.8028 0.898875 16.886 1.0212 16.94 1.15702C17.427 2.37302 17.46 3.45402 17.242 4.34702C17.933 5.28302 18.3 6.39202 18.3 7.64002C18.3 11.397 16.626 13.305 13.658 14.032C13.783 14.447 13.848 14.911 13.848 15.412C13.8481 16.3174 13.8441 17.2227 13.836 18.128C14.0606 18.177 14.2614 18.3019 14.4047 18.4816C14.548 18.6613 14.6251 18.8849 14.6228 19.1147C14.6206 19.3446 14.5393 19.5667 14.3925 19.7436C14.2457 19.9205 14.0425 20.0414 13.817 20.086C12.678 20.314 11.834 19.554 11.834 18.561L11.836 18.115L11.841 17.41C11.846 16.702 11.848 16.072 11.848 15.412C11.848 14.715 11.665 14.26 11.423 14.052C10.762 13.482 11.097 12.397 11.963 12.3C14.93 11.967 16.3 10.818 16.3 7.64002C16.3 6.68502 15.988 5.89602 15.387 5.23602C15.2604 5.09727 15.1754 4.92565 15.1418 4.74083C15.1082 4.55602 15.1273 4.36547 15.197 4.19102C15.363 3.77702 15.434 3.23402 15.293 2.57702L15.283 2.58002C14.792 2.71902 14.173 3.02002 13.425 3.52902C13.3044 3.61088 13.1673 3.66537 13.0234 3.68869C12.8796 3.71201 12.7323 3.70359 12.592 3.66402C11.7479 3.43031 10.8759 3.31289 10 3.31502C9.11001 3.31502 8.22801 3.43402 7.40801 3.66502C7.26823 3.70428 7.12158 3.71263 6.97824 3.68949C6.83491 3.66635 6.69834 3.61227 6.57801 3.53102C5.82601 3.02402 5.20401 2.72402 4.71001 2.58402C4.56601 3.23702 4.63701 3.77802 4.80201 4.19102C4.87182 4.36538 4.89111 4.55587 4.85769 4.74068C4.82426 4.9255 4.73947 5.09716 4.61301 5.23602C4.01601 5.89002 3.70001 6.69402 3.70001 7.64002C3.70001 10.812 5.07101 11.968 8.02201 12.3C8.88701 12.397 9.22301 13.477 8.56601 14.048C8.37401 14.216 8.13701 14.78 8.13701 15.412V18.562C8.13701 19.548 7.30201 20.287 6.17701 20.09C5.94878 20.0499 5.74154 19.9319 5.59073 19.7559C5.43991 19.58 5.35488 19.3572 5.35015 19.1255C5.34543 18.8938 5.42131 18.6677 5.56483 18.4857C5.70835 18.3038 5.9106 18.1774 6.13701 18.128V17.138C5.22701 17.199 4.47501 17.05 3.88301 16.653V16.653Z"
                  fill="#0351CE"
                />
              </svg>
            </Icon>
          </div>

          <div className="login__or mb2">Hoặc</div>

          <form className="w100" onSubmit={loginSubmitHandle}>
            <div className="form__group">
              <InputText
                placeholder="Email"
                id="username"
                value={emailEntered}
                onChange={(e) => setEmailEntered(e.target.value)}
                validStatus={isSubmited ? (emailIsValid ? 'valid' : 'invalid') : undefined }
              />
            </div>
            <div className="form__group">
              <InputText
                placeholder="Mật khẩu"
                id="password"
                value={passwordEntered}
                onChange={(e) => setPasswordEntered(e.target.value)}
                validStatus={isSubmited ? (passIsValid ? 'valid' : 'invalid') : undefined }
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
