import React from "react";
import moment from "moment";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import {
  CreateNewMonthlyExpense,
  MonthlyExpenseFromDB,
  submitMonthlyExpenseHeaders,
  allMonthlyExpensesHeaders,
  monthlyExpenseReducer,
} from "./components";

import AppIdForm from "../../forms/AppIDForm";

const User = () => {
  //REDUCER
  const [state, dispatch] = React.useReducer(monthlyExpenseReducer, {
    name: "",
    amount: "",
    expenseDate: "2020-01",
    expenseTypeValue: 1,
  });
  // SETUP STATE
  const [monthlyExpDB, setMonthlyExpDB] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [submit, setSubmit] = React.useState(false);

  // NEW MONTHLY EXPENSES
  const handleChange = (inputName, value) => {
    dispatch({
      type: "UPDATE",
      [inputName]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // await createMonthlyExpense(state);
    // dispatch({
    //   type: "RESET",
    // });
    // setSubmit((prevSubmit) => {
    //   return !prevSubmit;
    // });
  };

  //EXISTING MONTHLY EXPENSES
  const handleMonthlyExpChange = (expenseID, value) => {
    setMonthlyExpDB((prevMonthlyExpDB) => {
      const index = prevMonthlyExpDB.findIndex((exp) => {
        return exp._id === expenseID;
      });
      prevMonthlyExpDB[index].amount = value * 1;
      return prevMonthlyExpDB;
    });
  };
  const handleMonthlyExpEdit = (expenseID, amount) => {
    //editMonthlyExpense(expenseID, amount);
  };
  const handleMonthlyExpDelete = (expenseID) => {
    //deleteMonthlyExpense(expenseID);
    setSubmit((prevSubmit) => {
      return !prevSubmit;
    });
  };

  // LOAD TABLE DATA
  React.useEffect(() => {
    const startDateMonthlyExp = moment("1/1/1990");
    const endDateMonthlyExp = moment("1/1/2100");
    // renderExpenseTable(startDateMonthlyExp, endDateMonthlyExp).then((data) => {
    //   setLoading(false);
    //   setMonthlyExpDB(data);
    // });
  }, [submit]);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="10">
                      <FormGroup>
                        <label>Email address</label>
                        <Input placeholder="mike@email.com" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Edit App IDs and Trial Periods</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Col className="pr-md-1" md="10">
                    <AppIdForm />
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default User;
