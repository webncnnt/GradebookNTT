import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type authctxProps = {
  children: JSX.Element;
};

interface userType {
  id: number;
  fullname: string;
  email: string;
  password: string;
  role: number;
  studentId: number | null;
  avatar: string | null;
  dob: string | null;
  address: string | null;
  numberPhone: string | null;
  facebook: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthThemeContext {
  isLoggedIn: boolean;
  isRegisterSuccess: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, fullname: string) => void;
  onChangePass: (oldPass: string, newPass: string) => void;
  message: string;
  user: userType;
  setUser: (user: userType) => void;
}

const AuthContext = React.createContext<AuthThemeContext>({
  isLoggedIn: false,
  isRegisterSuccess: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
  onRegister: (email: string, password: string, fullname: string) => {},
  onChangePass: (oldPass: string, newPass: string) => {},
  message: "",
  user: {
    id: 0,
    fullname: "",
    email: "",
    password: "",
    role: 0,
    studentId: null,
    avatar: null,
    dob: null,
    address: null,
    numberPhone: null,
    facebook: null,
    createdAt: "",
    updatedAt: "",
  },
  setUser: (user: userType) => {},
});

const AuthContextProvider = ({ children }: authctxProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegisterSuccess, setIsRegiterSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<userType>({
    id: 0,
    fullname: "",
    email: "",
    password: "",
    role: 0,
    studentId: null,
    avatar: null,
    dob: null,
    address: null,
    numberPhone: null,
    facebook: null,
    createdAt: "",
    updatedAt: "",
  });

  const pathname = window.location.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    const accessTokenStore = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    let accessTokenFormat = "";
    if (accessTokenStore) accessTokenFormat = accessTokenStore;

    const checkToken = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/profile/" + userId, {
          headers: {
            authorization: accessTokenFormat,
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();

        if (res.status !== 200) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          throw new Error(result.message);
        } else {
          setIsLoggedIn(true);
          setUser(result.profile);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, [pathname]);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
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
        setMessage(result.message);
        setUser(result.user);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("userId", result.user.id);
        navigate("/listClasses");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(isLoggedIn);
  };

  const changePassword = async (oldPass: string, newPass: string) => {
    const data = { oldPass: oldPass, newPass: newPass };
    const userId = user.id;
    
    try {
      const res = await fetch(
        "http://localhost:8000/api/auth/changePwd/" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (res.status !== 200) {
        throw new Error(result.message);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isRegisterSuccess: isRegisterSuccess,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onRegister: registerHandler,
        onChangePass: changePassword,
        message: message,
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
