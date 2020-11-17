import React from "react";

import {
  Button,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import { addAppID, removeAppID } from "../../api/user/index";
import { useCookies } from "react-cookie";

const AppIDForm = () => {
  const [appID, setAppID] = React.useState("");
  const [trialPeriod, SetTrialPeriod] = React.useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  console.log("cookies:", cookies);

  const handleRemove = async (event) => {};
  const handleSubmit = async (event) => {
    event.preventDefault();

    await addAppID(appID, trialPeriod);

    setAppID("");
    SetTrialPeriod("");
  };

  return (
    <Row className="justify-content-center">
      <div className="content">
        <Col md="12">
          <Table>
            <thead className="text-primary">
              <tr>
                <th>App ID</th>
                <th>Trial Period</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>323213</td>
                <td>15</td>
                <td>
                  <Button
                    className="btn-link"
                    color="danger"
                    id="tooltip974171201"
                    size="sm"
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip974171201">
                    Remove App ID
                  </UncontrolledTooltip>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Row>
          <Col md="5">
            <label>App ID</label>
            <FormGroup>
              <Input type="text" />
            </FormGroup>
          </Col>
          <Col md="4">
            <label>Trial Period</label>
            <FormGroup>
              <Input type="text" />
            </FormGroup>
          </Col>
          <Col md="3">
            <Button
              style={{ marginTop: "23px" }}
              className="btn-fill"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default AppIDForm;
