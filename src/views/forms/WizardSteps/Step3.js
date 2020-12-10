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
              <div style={{ overflow: "hidden" }}>
                <iframe
                  width="100%"
                  height="1733px"
                  src="https://payments.pabbly.com/subscribe/5fd286f9c7ccc726912142d8/standard-plan"
                ></iframe>
              </div>
            </Col>
          </Row>
        </form>
      </>
    );
  }
}

export default Wizard;
