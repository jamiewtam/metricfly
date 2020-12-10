import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import validator from "email-validator";

import ReactBSAlert from "react-bootstrap-sweetalert";

import { registerUser } from "../../../api/auth";
import { AuthContext } from "../../../util/Context/auth-context";

class Register extends React.Component {
  state = {
    email: "",
    pass: "",
    passConfirm: "",
    alert: null,
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  static contextType = AuthContext;

  handleChange = (type, event) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const isEmail = validator.validate(this.state.email);

    if (isEmail) {
      const { status, message, token, user } = await registerUser(
        this.state.email,
        this.state.pass,
        this.state.passConfirm
      );

      if (status === "success") {
        this.context.login(token, user);
        this.setState({
          alert: (
            <ReactBSAlert
              success
              style={{ display: "block", marginTop: "-100px" }}
              title="You've Been Registered"
              onConfirm={() => this.hideAlert()}
              onCancel={() => this.hideAlert()}
              confirmBtnBsStyle="success"
              btnSize=""
            />
          ),
        });
        setTimeout(() => {
          this.props.history.push("/auth/setup");
        }, 1000);
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
    } else {
      this.setState({
        alert: (
          <ReactBSAlert
            error
            style={{ display: "block", marginTop: "-100px" }}
            title="Please Enter In a Correct Email"
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
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-sound-wave" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Advanced Analytics</h3>
                    <p className="description">
                      Understand how your Shopify app is actually performing
                      without the spreadsheets.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-settings-gear-63" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Built for Shopify Partners</h3>
                    <p className="description">
                      The only SasS analytics tool which fully integrates with
                      your Shopify Partner dashboard.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-check-2" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">One-Click Insights</h3>
                    <p className="description">
                      Calculate valuable metrics such as LTV, CAC, and trial
                      conversion ratios in just one-click.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h4">Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className="form">
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
                          onFocus={(e) => this.setState({ emailFocus: true })}
                          onBlur={(e) => this.setState({ emailFocus: false })}
                          value={this.state.email}
                          onChange={(event) =>
                            this.handleChange("email", event)
                          }
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
                          onFocus={(e) => this.setState({ passFocus: true })}
                          onBlur={(e) => this.setState({ passFocus: false })}
                          onChange={(event) => this.handleChange("pass", event)}
                        />
                      </InputGroup>
                      <InputGroup
                        className={classnames({
                          "input-group-focus": this.state.passConfirmFocus,
                        })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirm Your Password"
                          type="password"
                          onFocus={(e) =>
                            this.setState({ passConfirmFocus: true })
                          }
                          onBlur={(e) =>
                            this.setState({ passConfirmFocus: false })
                          }
                          onChange={(event) =>
                            this.handleChange("passConfirm", event)
                          }
                        />
                      </InputGroup>
                      {/* <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />I agree to the{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                      </Label>
                      </FormGroup> */}
                    </Form>
                  </CardBody>
                  <CardFooter style={{ marginTop: "0px" }}>
                    <Button
                      className="btn-round"
                      color="primary"
                      onClick={this.handleSubmit}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Register;
