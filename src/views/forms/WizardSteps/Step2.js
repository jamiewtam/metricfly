import React from "react";

import { Row } from "reactstrap";

import AppIdForm from "../AppIDForm";

// core components

class Wizard extends React.Component {
  render() {
    return (
      <>
        <h4 className="info-text">Enter In Your App IDs and Trial Periods</h4>
        <Row className="justify-content-center">
          <AppIdForm />
        </Row>
      </>
    );
  }
}

export default Wizard;
