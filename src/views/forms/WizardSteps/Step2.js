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

import AppIdForm from "../AppIDForm";

// core components

class Wizard extends React.Component {
  render() {
    return (
      <>
        <h4 className="info-text">Enter In Your App IDs and Trial Periods</h4>
        <AppIdForm />
      </>
    );
  }
}

export default Wizard;
