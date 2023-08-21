import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter} from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

ReactDOM.render(
  <AuthProvider 
  authType={"cookie"}
  authName={"_auth"}
  cookieDomain={window.location.hostname}
  cookieSecure={false}
>
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  </AuthProvider>,
  document.getElementById("root")
);

reportWebVitals();
