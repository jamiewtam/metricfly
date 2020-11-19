/*!

=========================================================
* Black Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import { Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";

import { logoutUser } from "../../api/auth";
import { AuthContext } from "../../util/Context/auth-context";

class Login extends React.Component {
  state = {};

  static contextType = AuthContext;

  componentDidMount = async () => {
    const { status } = await logoutUser();

    if (status === "success") {
      this.setState({
        alert: (
          <ReactBSAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Successfully Logged Out"
            onCancel={() => this.hideAlert()}
            showConfirm={false}
          />
        ),
      });
      console.log(this.context);
      this.context.logout();
    }

    this.setState({
      loggedOut: true,
    });

    setTimeout(() => {
      return this.props.history.push("auth/login");
    }, 1000);
  };

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  render() {
    if (this.state.loggedOut) {
      return <React.Fragment>{this.state.alert}</React.Fragment>;
    }

    return (
      <>
        <div className="content">
          <Container></Container>
        </div>
      </>
    );
  }
}

export default Login;
