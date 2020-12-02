import React from "react";

import { Row, Button, Col, FormGroup } from "reactstrap";

import TimezoneSelector from "../components/TimezoneSelector";
import { AuthContext } from "../../util/Context/auth-context";

import { updateUser } from "../../api/user";

const TimezoneForm = () => {
  const email = React.useContext(AuthContext).user.email;
  const [timezone, setTimezone] = React.useState({ value: "Etc/GMT+0" });

  const handleTimezoneChange = (value) => {
    setTimezone(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUser(email, timezone.value);
  };
  return (
    <>
      <React.Fragment>
        <br />
        <hr />
        <h5 className="info-text">Enter In Your Timezone</h5>
        <Row className="justify-content-center">
          <Col md="6">
            <FormGroup>
              <TimezoneSelector
                handleChange={handleTimezoneChange}
                value={timezone}
              />
            </FormGroup>
          </Col>
          <Col md="1">
            <Button
              className="btn-fill"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    </>
  );
};

export default TimezoneForm;
