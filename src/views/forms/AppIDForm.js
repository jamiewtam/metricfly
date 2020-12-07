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

import { AuthContext } from "../../util/Context/auth-context";
import loadUserInContext from "../../util/Context/loadUserInContext";

const AppIDForm = () => {
  const { user, login, loadingHandler } = React.useContext(AuthContext);

  const [appID, setAppID] = React.useState("");
  const [trialPeriod, SetTrialPeriod] = React.useState("");
  const [appIDAndTrialsDB, setAppIDAndTrialsDB] = React.useState(
    user.appIDsAndTrialPeriods
  );

  const handleChange = (event, target) => {
    const value = event.target.value;
    if (target === "appID") {
      setAppID(value);
    } else if (target === "trialPeriod") {
      SetTrialPeriod(value);
    }
  };

  const handleRemove = async (event, appID) => {
    event.preventDefault();

    await removeAppID(appID);

    setAppIDAndTrialsDB((prev) => {
      return prev.filter((el) => {
        return el.appID !== appID;
      });
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    await addAppID(appID, trialPeriod);

    setAppID("");
    SetTrialPeriod("");
    setAppIDAndTrialsDB((prev) => {
      return prev.concat({
        appID,
        trialPeriod,
      });
    });
  };

  React.useEffect(() => {
    loadUserInContext(login, loadingHandler);
  }, [appIDAndTrialsDB, login, loadingHandler]);

  let appIDAndTrialPeriods;

  if (user.appIDsAndTrialPeriods) {
    appIDAndTrialPeriods = appIDAndTrialsDB.map((el) => {
      return (
        <tr key={el.appID}>
          <td>{el.appID}</td>
          <td>{el.trialPeriod}</td>
          <td>
            <Button
              className="btn-link"
              color="danger"
              id="tooltip974171201"
              size="sm"
              onClick={(event) => handleRemove(event, el.appID)}
            >
              <i className="tim-icons icon-simple-remove" />
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip974171201">
              Remove App ID
            </UncontrolledTooltip>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Row>
        <Col md="12">
          <Table>
            <thead className="text-primary">
              <tr>
                <th>App ID</th>
                <th>Trial Period (in days)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{appIDAndTrialPeriods}</tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md="5">
          <label>App ID</label>
          <FormGroup>
            <Input
              onChange={(event) => handleChange(event, "appID")}
              value={appID}
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <label>Trial Period (in days)</label>
          <FormGroup>
            <Input
              onChange={(event) => handleChange(event, "trialPeriod")}
              value={trialPeriod}
              type="text"
            />
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
  );
};

export default AppIDForm;
