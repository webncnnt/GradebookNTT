import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type authctxProps = {
  children: JSX.Element;
};

interface AuthThemeContext {
  isLoggedIn: boolean;
  isRegisterSuccess: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, fullname: string) => void;
  accessToken: string | null;
  message: string;
  user: string;
}

const AuthContext = React.createContext<AuthThemeContext>({
  isLoggedIn: false,
  isRegisterSuccess: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
  onRegister: (email: string, password: string, fullname: string) => {},
  accessToken: null,
  message: "",
  user: "",
});

const AuthContextProvider = ({ children }: authctxProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegisterSuccess, setIsRegiterSuccess] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessTokenStore = localStorage.getItem("accessToken");

    let accessTokenFormat = "";
    if (accessTokenStore) accessTokenFormat = accessTokenStore;

    const checkToken = async () => {
      console.log(accessTokenFormat);
      
      try {
        const res = await fetch("http://localhost:8000/api/profile", {
          headers: {
            authorization: accessTokenFormat,
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          console.log(result.message);

          setIsLoggedIn(true);
          setUser(result.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  });

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  const registerHandler = async (
    email: string,
    password: string,
    fullname: string
  ) => {
    const data = { email: email, password: password, fullname: fullname };

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.status !== 200) {
        throw new Error(result.message);
      } else {
        setMessage(result.message);
        setIsRegiterSuccess(true);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async (email: string, password: string) => {
    const data = { email: email, password: password };

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.status !== 200) {
        throw new Error(result.message);
      } else {
        setIsLoggedIn(true);
        setAccessToken(result.accessToken);
        setMessage(result.message);
        setUser(result.user);
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/listClasses");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(isLoggedIn);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isRegisterSuccess: isRegisterSuccess,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onRegister: registerHandler,
        accessToken: accessToken,
        message: message,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
