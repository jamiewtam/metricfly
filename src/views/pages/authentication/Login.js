import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { loginUser } from "../../../api/auth";
import { AuthContext } from "../../../util/Context/auth-context";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    token: "",
  };
  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  static contextType = AuthContext;

  handleChange = (type, event) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { status, message, token, user } = await loginUser(
      this.state.email,
      this.state.password
    );

    if (status === "success") {
      this.context.login(token, user);
      this.setState({
        alert: (
          <ReactBSAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Successfully Logged In"
            showConfirm={false}
            onCancel={() => this.hideAlert()}
            btnSize=""
          />
        ),
      });
      this.props.history.push("/auth/syncData/false");
    } else {
      this.setState({
        alert: (
          <ReactBSAlert
            error
            style={{ display: "block", marginTop: "-100px" }}
            title={message}
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnBsStyle="error"
            btnSize=""
          />
        ),
      });
    }
  };

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };
  render() {
    return (
      <>
        <div className="content">
          {this.state.alert}
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form">
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.emailFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        value={this.state.email}
                        onChange={(event) => this.handleChange("email", event)}
                        onFocus={(e) => this.setState({ emailFocus: true })}
                        onBlur={(e) => this.setState({ emailFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.passFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onChange={(event) =>
                          this.handleChange("password", event)
                        }
                        onFocus={(e) => this.setState({ passFocus: true })}
                        onBlur={(e) => this.setState({ passFocus: false })}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      href="#pablo"
                      onClick={this.handleSubmit}
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link to="/auth/register" className="link footer-link">
                          Create Account
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}

export default Login;
