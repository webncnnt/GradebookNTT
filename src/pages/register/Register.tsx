import { useState } from "react";
import RegisterImage from "../../assets/images/Saly-22.png";
import Container from "../../components/layouts/container/Container";
import Button from "../../components/UI/button/Button";
import InputText from "../../components/UI/input-text/InputText";
import InputPassword from "../../components/UI/input/input-password/InputPassword";
import { useAuth } from "../../contexts/auth-context";


const Register = () => {
  const [emailEntered, setEmailEntered] = useState<string>("");
  const [passwordEntered, setPasswordEntered] = useState<string>("");
  const [passwordAgainEntered, setPasswordAgainEntered] = useState<string>("");
  const [fullnameEntered, setFullnameEntered] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const authCtx = useAuth();

  let emailIsValid = false;
  let passIsValid = false;
  let passAgainIsValid = false;
  let nameIsValid = false;

  if (emailEntered.trim() !== "") emailIsValid = true;
  if (passwordEntered.trim() !== "") passIsValid = true;
  if (
    passwordAgainEntered.trim() !== "" &&
    passwordAgainEntered === passwordEntered
  )
    passAgainIsValid = true;
  if (fullnameEntered.trim() !== "") nameIsValid = true;

  const registerSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmited(true);

    if (emailEntered.trim() !== "") emailIsValid = true;
    if (passwordEntered.trim() !== "") passIsValid = true;
    if (
      passwordAgainEntered.trim() !== "" &&
      passwordAgainEntered === passwordEntered
    )
      passAgainIsValid = true;
    if (fullnameEntered.trim() !== "") nameIsValid = true;

    if (emailIsValid && passIsValid && passAgainIsValid && nameIsValid) {
      authCtx.onRegister(emailEntered, passwordEntered, fullnameEntered);
    }
  };

  return (
    <Container>
      <div className="register">
        <div className="register__img">
          <img src={RegisterImage} alt="" />
        </div>
        <div className="register__content">
          <h2 className="register__title mb2">Đăng ký</h2>

          <form className="w100" onSubmit={registerSubmitHandle}>
            <div className="form__group">
              <InputText
                placeholder="Email"
                id="username_register"
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
                id="password_register"
                value={passwordEntered}
                onChange={(e) => setPasswordEntered(e.target.value)}
                validStatus={
                  isSubmited ? (passIsValid ? "valid" : "invalid") : undefined
                }
              />
            </div>

            <div className="form__group">
              <InputPassword
                placeholder="Nhập lại mật khẩu"
                id="password_register-again"
                value={passwordAgainEntered}
                onChange={(e) => setPasswordAgainEntered(e.target.value)}
                validStatus={
                  isSubmited
                    ? passAgainIsValid
                      ? "valid"
                      : "invalid"
                    : undefined
                }
              />
            </div>
            <div className="form__group">
              <InputText
                placeholder="Họ và tên"
                id="fullname_register"
                value={fullnameEntered}
                onChange={(e) => setFullnameEntered(e.target.value)}
                validStatus={
                  isSubmited ? (nameIsValid ? "valid" : "invalid") : undefined
                }
              />
            </div>

            <div className="register__rules mb2">
              <input type="checkbox" id="check-rules" name="check-rules" />
              <label htmlFor="check-rules">
                Tôi đồng ý với các <span>điều khoản</span> của hệ thống
              </label>
            </div>

            <div className="form__group">
              <Button content="Đăng ký" type="primary" fullsize={true} />
            </div>
            <div className="register__redirect">
              Bạn đã có tài khoản? <span>Đăng nhập</span>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
