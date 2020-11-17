/*!

=========================================================
* Black Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class Wizard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h5 className="info-text">
          Let's start with the basic information (with validation)
        </h5>
        <Row className="justify-content-center mt-5">
          <Col className="text-center" lg="10">
            <p>
              Here are the steps you need to do to setup metricfly with Shopify
              partners
            </p>
          </Col>
        </Row>
      </>
    );
  }
}

export default Wizard;
