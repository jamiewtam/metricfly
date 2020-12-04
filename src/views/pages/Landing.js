import React from "react";
import classnames from "classnames";
import emailjs, { send } from "emailjs-com";
import { NavLink, Link } from "react-router-dom";

import ReactBSAlert from "react-bootstrap-sweetalert";
import Footer from "components/Footer/Footer.js";
import "assets/css/blk-design/blk-design-custom.css";
import LandingGif from "assets/gif/LandingPageGif.gif";
// import "assets/css/blk-design/demo.css";
// import "assets/css/blk-design/react-demo.css";

// reactstrap components
import {
  Button,
  Badge,
  Card,
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
      newState["color"] = "bg-dark";
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
        {/* <div className="wrapper wrapper-full-page" ref="fullPages">
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
        </div> */}

        {/* ********* HEADER 1 ********* */}
        <div className="header header-1">
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
                  <NavItem style={{ padding: "10px 0px" }}>
                    <NavLink
                      to="/auth/register"
                      className="nav-link"
                      style={{ padding: "0px" }}
                    >
                      <Button className="btn pulse" color="primary" size="sm">
                        Register
                      </Button>
                    </NavLink>
                  </NavItem>
                  <NavItem style={{ padding: "10px 0px" }}>
                    <NavLink
                      to="/auth/login"
                      className="nav-link"
                      style={{ padding: "0px" }}
                    >
                      <Button className="btn-simple btn btn-github" size="sm">
                        Login
                      </Button>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <div
            className="page-header header-filter"
            style={{ marginTop: "70px" }}
          >
            <div className="page-header-image" />
            <Container>
              <Row>
                <Col
                  className="mr-auto text-left mt-5"
                  lg="5"
                  md="7"
                  // style={{ paddingTop: "50px" }}
                >
                  <h1 className="title">
                    Advanced SaaS & Subscription Analytics For Your Shopify App.
                    All In Just One-Click.
                  </h1>
                  <br />
                  <div className="buttons">
                    <Link to="auth/register">
                      <Button
                        className="btn-round mr-3 pulse"
                        color="primary"
                        size="lg"
                      >
                        <i className="tim-icons icon-user-run" />
                        &nbsp; Register For the Beta Now
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col className="ml-auto mt-5" lg="7" md="12">
                  <Card style={{ backgroundColor: "#1E1E2F" }}>
                    <div className="iframe-container">
                      <img
                        alt="..."
                        // src="https://s3.amazonaws.com/creativetim_bucket/github/gif/black-dashboard.gif"
                        src={LandingGif}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        {/* ********* END HEADER 1 ********* */}
        {/* ********* FEATURES 1 ********* */}
        <div className="features-1" style={{ marginTop: "40px" }}>
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <Badge color="info" style={{ fontSize: "14px" }} pill>
                  Not your average analytics tool
                </Badge>
                <h1 className="title"> Real-time Insights and Analytics</h1>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <div className="landing-info landing-info-hover">
                  <div className="icon icon-primary" style={{ margin: "auto" }}>
                    <i className="tim-icons icon-user-run" />
                  </div>
                  <h4 className="info-title">
                    Full Shopify Partner Integration
                  </h4>
                  <p className="description">
                    The only SasS analytics tool which fully integrates with
                    your Shopify Partner dashboard. Giving you real-time access
                    to your app metrics and financial data data without lag. No
                    compromises needed.
                  </p>
                </div>
              </Col>
              <Col md="4">
                <div className="landing-info landing-info-hover">
                  <div className="icon icon-success" style={{ margin: "auto" }}>
                    <i className="tim-icons icon-atom" />
                  </div>
                  <h4 className="info-title">A Founder’s Best Friend</h4>
                  <p className="description">
                    Metricfly cuts through the noise and reveals the insights
                    you need to make profitable decisions that propel the
                    business forward. See what's happening today, plan for
                    tomorrow, and strategize for your future.
                  </p>
                </div>
              </Col>
              <Col md="4">
                <div className="landing-info landing-info-hover">
                  <div className="icon icon-warning" style={{ margin: "auto" }}>
                    <i className="tim-icons icon-gift-2" />
                  </div>
                  <h4 className="info-title">Make Data-driven Decisions.</h4>
                  <p className="description">
                    Finally, get the data you need to uncover growth
                    opportunities, get answers to your questions, and run
                    sophisticated analyses with ease. Being data-driven and
                    customer-obsessed just became a reality.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Footer fluid />
      </React.Fragment>
    );
  }
}

export default Register;
