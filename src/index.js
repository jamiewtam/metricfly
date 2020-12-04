import React from "react";
import ReactDOM from "react-dom";
import HttpsRedirect from "react-https-redirect";

import App from "./App";
import AuthProvider from "./util/Context/auth-context";

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.1.0";
import "assets/demo/demo.css";
import "react-date-range/dist/styles.css"; // Calendar CSS
import "react-date-range/dist/theme/default.css"; // Calendar CSS

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
