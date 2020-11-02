
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";

import Landing from "views/pages/Landing.js";

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.1.0";
import "assets/demo/demo.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" exact render={(props) => <Landing {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
