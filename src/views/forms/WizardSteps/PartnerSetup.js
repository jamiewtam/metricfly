import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class Wizard extends React.Component {
  render() {
    return (
      <>
        <h4 className="info-text">
          Here are the steps to connect your Shopify Partners account with
          Metricfly
        </h4>
        <Row className="justify-content-center mt-5">
          <Col className="text-center" lg="10">
            <ol style={{ textAlign: "left" }}>
              <p>
                <li>
                  Go to your partner dashboard &nbsp;
                  <a target="__blank" href="https://partners.shopify.com">
                    https://partners.shopify.com
                  </a>
                </li>
                <li> Click team on the left</li>
                <li> Click “Invite Staff Member”</li>
                <li>
                  Enter an in metricflyapp@gmail.com, and select only the “View
                  financials and manage apps” permission
                </li>
                <li>
                  Finally, grab your Partner ID from your Partner Dashboard URL
                  (in place of "APP_ID_HERE"). Your app ID can be placed on the
                  next page.
                </li>
              </p>
            </ol>
            <br />
            <img
              alt="..."
              className="rounded img-raised"
              src={require("assets/img/selectAppID.png")}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Wizard;
