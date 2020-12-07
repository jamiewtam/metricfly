import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import Landing from "views/pages/Landing.js";
import { AuthContext } from "./util/Context/auth-context";
import loadUserInContext from "./util/Context/loadUserInContext";
import Loading from "./util/Loading/Loading";

const hist = createBrowserHistory();

const App = () => {
  const { login, loading, loadingHandler } = React.useContext(AuthContext);

  React.useEffect(() => {
    loadUserInContext(login, loadingHandler);
  }, [login, loadingHandler]);

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
