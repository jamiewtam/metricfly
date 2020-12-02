import React from "react";
import { Link } from "react-router-dom";
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
import { AuthContext } from "../../../util/Context/auth-context";

import AppIdForm from "../../forms/AppIDForm";
import TimezoneSelector from "../../components/TimezoneSelector";

import { updateUser } from "../../../api/user";

const User = () => {
  const user = React.useContext(AuthContext).user;
  const [userEmail, setUserEmail] = React.useState(user.email);
  const [timezone, setTimezone] = React.useState({ value: user.timezone });

  const handleChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleTimezoneChange = (value) => {
    setTimezone(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUser(userEmail, timezone.value);
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
                    <Col className="pr-md-1" md="10">
                      <FormGroup>
                        <label>Email address</label>
                        <Input
                          value={userEmail}
                          type="email"
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="10">
                      <label>Timezone</label>
                      <TimezoneSelector
                        handleChange={handleTimezoneChange}
                        value={timezone}
                      />
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Edit App IDs and Trial Periods</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Col className="pr-md-1" md="10">
                    <AppIdForm />
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Resync All Shopify Partner Data</h5>
              </CardHeader>
              <CardBody>
                <p>This may take a few minutes...</p>
                <Link to="/auth/syncData/true">
                  <Button className="btn-fill" color="primary" type="submit">
                    Resync All Data
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default User;
