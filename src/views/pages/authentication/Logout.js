import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import { Redirect } from "react-router-dom";

import { logoutUser } from "../../../api/auth";
import { AuthContext } from "../../../util/Context/auth-context";

class Login extends React.Component {
  state = {
    loggedOut: false,
  };

  static contextType = AuthContext;

  componentDidMount = async () => {
    const { status } = await logoutUser();

    if (status === "success") {
      this.context.logout();
      this.setState({
        loggedOut: true,
      });
    }
  };

  render() {
    if (this.state.loggedOut) {
      setTimeout(() => {
        window.location.reload();
      }, 1200);

      return <Redirect to="/" />;
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
