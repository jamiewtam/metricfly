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
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

//Context
import { AuthContext } from "../../util/Context/auth-context";

// wizard steps

import Step1 from "./WizardSteps/PartnerSetup.js";
import Step2 from "./WizardSteps/Step2.js";
import Step3 from "./WizardSteps/Step3.js";

var steps = [
  {
    stepName: "Partner Login",
    stepIcon: "tim-icons icon-single-02",
    component: Step1,
  },
  {
    stepName: "Account Setup",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: Step2,
  },
  {
    stepName: "Billing Info",
    stepIcon: "tim-icons icon-delivery-fast",
    component: Step3,
  },
];

class Wizard extends React.Component {
  static contextType = AuthContext;

  render() {
    if (!this.context.auth) {
      this.props.history.push("/auth/login");
    }
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title="Build Your Profile"
              description="Get Your Dashboard Setup In Just a Few Steps"
              headerTextCenter
              finishButtonClasses="btn-wd btn-info"
              finishButtonClick={() =>
                this.props.history.push("/admin/dashboard")
              }
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              progressbar
              color="blue"
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Wizard;
