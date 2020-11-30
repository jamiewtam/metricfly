import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import Landing from "views/pages/Landing.js";
import { AuthContext } from "./util/Context/auth-context";
import axios from "axios";
import Loading from "./util/Loading/Loading";

const hist = createBrowserHistory();

const App = () => {
  const AuthRef = React.useContext(AuthContext);

  // Check if User Has logged in on startup (from local storage)
  const loginHandlerFromContext = AuthRef.login;
  const loading = AuthRef.loading;
  const loadingHandler = AuthRef.loadingHandler;

  React.useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem("userData")
    );

    const getCurrentUser = async (token) => {
      try {
        const res = await axios({
          url: "http://127.0.0.1:9000/api/v1/users/findDBUser",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.status === "success") {
          return res.data.data.user;
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (
      userDataFromLocalStorage &&
      userDataFromLocalStorage.token &&
      new Date(userDataFromLocalStorage.expiration) > new Date()
    ) {
      getCurrentUser(userDataFromLocalStorage.token).then((user) => {
        loginHandlerFromContext(
          userDataFromLocalStorage.token,
          user,
          new Date(userDataFromLocalStorage.expiration)
        );
        loadingHandler();
      });
    } else {
      loadingHandler();
    }
  }, [loginHandlerFromContext, loadingHandler]);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <Router history={hist}>
      <Switch>
        <Route path="/" exact render={(props) => <Landing {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
