import React from "react";
import FacebookLogin from "react-facebook-login";
import "../../../../assets/css/custom.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { AuthContext } from "../../../../util/Context/auth-context";

const AdAccounts = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  const facebookClass = {
    color: "white",
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="10"></Col>
                    <Col className="pr-md-1" md="10">
                      <p>Log Into Facebook</p>

                      <FacebookLogin
                        appId="175168940924367"
                        fields="name"
                        cssClass="facebook-button"
                        scope="ads_read"
                        // onClick={componentClicked}
                        callback={responseFacebook}
                      />
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdAccounts;
