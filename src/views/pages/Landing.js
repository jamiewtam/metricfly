import React from "react";
import classnames from "classnames";
import emailjs, { send } from "emailjs-com";
import { NavLink } from "react-router-dom";
import Footer from "components/Footer/Footer.js";
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
} from "reactstrap";

class Register extends React.Component {
  state = {
    collapseOpen: false,
    color: "navbar-transparent",
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen,
    };
    if (!this.state.collapseOpen) {
      newState["color"] = "bg-white";
    } else {
      newState["color"] = "navbar-transparent";
    }
    this.setState(newState);
  };

  hideAlert = () => {
    this.setState({
      alert: null,
    });
  };

  render() {
    const sendEmail = (e) => {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_ka7yz2k",
          "template_prkwfuh",
          e.target,
          "user_0ew1R4Z6K5utn3pnGjF4g"
        )
        .then(
          (result) => {
            console.log(result.text);
            this.setState({
              alert: (
                <ReactBSAlert
                  success
                  style={{ display: "block", marginTop: "-100px" }}
                  title="Successfully Signed Up"
                  onConfirm={() => this.hideAlert()}
                  onCancel={() => this.hideAlert()}
                  confirmBtnBsStyle="success"
                  btnSize=""
                />
              ),
            });
          },
          (error) => {
            console.log(error.text);
          }
        );
    };
    return (
      <React.Fragment>
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <Navbar
            className={classnames(
              "navbar-absolute fixed-top",
              this.state.color
            )}
            expand="lg"
          >
            <Container fluid>
              <div className="navbar-wrapper">
                <NavbarBrand href="/" onClick={(e) => this.history.push("/")}>
                  <img
                    style={{ height: "47px", width: "200px" }}
                    alt="..."
                    src={require("assets/img/logo-white.png")}
                  />
                </NavbarBrand>
              </div>
              <button
                aria-controls="navigation-index"
                aria-expanded={false}
                aria-label="Toggle navigation"
                className="navbar-toggler"
                data-toggle="collapse"
                type="button"
                onClick={this.toggleCollapse}
              >
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
              </button>
              <Collapse isOpen={this.state.collapseOpen} navbar>
                <Nav navbar className="ml-auto">
                  <NavItem>
                    <NavLink to="/auth/pricing" className="nav-link">
                      <i className="tim-icons icon-coins" /> Pricing
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/auth/register" className="nav-link">
                      <i className="tim-icons icon-laptop" /> Register
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/auth/login" className="nav-link">
                      <i className="tim-icons icon-single-02" /> Login
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          {this.state.alert}
          <div className={"full-page "}>
            <div className="content">
              <Container>
                <Row>
                  <Col className="ml-auto" md="5">
                    <div className="info-area info-horizontal mt-5">
                      <div className="icon icon-warning">
                        <i className="tim-icons icon-chart-pie-36" />
                      </div>
                      <div className="description">
                        <h3 className="info-title">Shopify App Analytics</h3>
                        <p className="description">
                          Advanced analytics for your Shopify app. Get insights
                          such as your true LTV, retention ratios, and average
                          subscription length.
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col className="mr-auto" md="7">
                    <Card className="card-register card-white">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/card-danger.png")}
                        />
                        <CardTitle tag="h4">signup</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form" onSubmit={sendEmail}>
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
                              name="user_email"
                              onFocus={(e) =>
                                this.setState({ emailFocus: true })
                              }
                              onBlur={(e) =>
                                this.setState({ emailFocus: false })
                              }
                            />
                          </InputGroup>
                          <Button
                            className="btn-round"
                            color="default"
                            size="lg"
                            type="submit"
                          >
                            Register for Beta
                          </Button>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
        <Footer fluid />
      </React.Fragment>
    );
  }
}

export default Register;
