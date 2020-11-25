import React from "react";

import { Row } from "reactstrap";

import AppIdForm from "../AppIDForm";
import TimezoneForm from "../TimezoneForm";

class Wizard extends React.Component {
  render() {
    return (
      <>
        <h4 className="info-text">User Settings</h4>
        <h5 className="info-text">Enter In Your App IDs and Trial Periods</h5>
        <Row className="justify-content-center">
          <AppIdForm />
        </Row>
        <TimezoneForm />
      </>
    );
  }
}

export default Wizard;
