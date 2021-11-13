import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./sass/index.scss";
import App from "./App";
import { AuthContextProvider } from "./contexts/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
