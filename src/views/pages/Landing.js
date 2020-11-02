import React from "react";
import classnames from "classnames";
import emailjs, { send } from "emailjs-com";
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
} from "reactstrap";

class Register extends React.Component {
  state = {};
  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

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
          },
          (error) => {
            console.log(error.text);
          }
        );
    };
    return (
      <div className="wrapper wrapper-full-page" ref="fullPages">
        <div className={"full-page "}>
          <div className="content">
            <Container>
              <h1 style={{ textAlign: "center" }}>METRICFLY.IO</h1>
              <Row>
                <Col className="ml-auto" md="5">
                  <div className="info-area info-horizontal mt-5">
                    <div className="icon icon-warning">
                      <i className="tim-icons icon-wifi" />
                    </div>
                    <div className="description">
                      <h3 className="info-title">Shopify App Analytics</h3>
                      <p className="description">
                        Advanced financial for your Shopify app. Get insights
                        such as your true LTV, retention ratios, and average
                        subscription length.
                      </p>
                    </div>
                  </div>
                  {/* <div className="info-area info-horizontal">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-triangle-right-17" />
                    </div>
                    <div className="description">
                      <h3 className="info-title">Say Goodbye to Excel</h3>
                      <p className="description">
                        Discover your apps true performance without the hassle
                        of excel.
                      </p>
                    </div>
                  </div>
                  <div className="info-area info-horizontal"> */}
                  {/* <div className="icon icon-info">
                      <i className="tim-icons icon-trophy" />
                    </div>
                    <div className="description">
                      <h3 className="info-title">
                        Built Exclusively for Shopify Apps
                      </h3>
                      <p className="description">
                        We build exclusively for Shopify Apps giving you the
                        exact metrics you need.
                      </p>
                    </div>
                  </div> */}
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
                            onFocus={(e) => this.setState({ emailFocus: true })}
                            onBlur={(e) => this.setState({ emailFocus: false })}
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
    );
  }
}

export default Register;
