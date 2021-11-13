import React, { useEffect, useState } from "react";

type authctxProps = {
  children: JSX.Element;
};

interface AuthThemeContext {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
  accessToken: string | null;
  message: string;
  user: string;
}

export const AuthContext = React.createContext<AuthThemeContext>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
  accessToken: null,
  message: "",
  user: "",
});

export const AuthContextProvider = ({ children }: authctxProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const accessTokenStore = localStorage.getItem("isLoggedIn");

    let accessTokenFormat = "";
    if (accessTokenStore) accessTokenFormat = accessTokenStore;

    const checkToken = async () => {   
      try {
        const res = await fetch(
          "https://classroom.eastasia.cloudapp.azure.com/api/profile",
          {
            headers: {
              Authorization: accessTokenFormat,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await res.json();

        if (res.status !== 200) {
          throw new Error(result.message);
        } else {
          setIsLoggedIn(true);
          setUser(result.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkToken();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = async (email: string, password: string) => {
    const data = { email: email, password: password };

    try {
      const res = await fetch(
        "https://classroom.eastasia.cloudapp.azure.com/api/auth/login",
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
        setAccessToken(result.accessToken);
        setMessage(result.message);
        setUser(result.user);
        localStorage.setItem("isLoggedIn", result.accessToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        accessToken: accessToken,
        message: message,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
