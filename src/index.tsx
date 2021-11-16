import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./sass/index.scss";
import App from "./App";
import { AuthContextProvider } from "./contexts/auth-context";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
