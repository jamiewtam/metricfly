import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step3Select: null,
    };
  }
  render() {
    return (
      <>
        <form>
          <Row className="justify-content-center">
            <Col sm="12">
              <h5 className="info-text">Insert Billing Below</h5>
            </Col>
          </Row>
        </form>
      </>
    );
  }
}

export default Wizard;
