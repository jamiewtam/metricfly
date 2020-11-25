import React from "react";
import moment from "moment";
// COMPONENTS
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import {
  CreateNewMonthlyExpense,
  MonthlyExpenseFromDB,
  monthlyExpenseReducer,
} from "./components";
//FUNCTIONS
import {
  createMonthlyExpense,
  deleteMonthlyExpense,
  editMonthlyExpense,
  renderMonthlyExpenseTable,
} from "../../../../api/expenses/monthlyExpenses/index";

const MonthlyExpenses = () => {
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
  const [repeatingSelection, setRepeatingSelection] = React.useState({
    value: 1,
    label: "One Time Expense",
  });

  // NEW MONTHLY EXPENSES
  const handleChange = (inputName, value) => {
    if (inputName === "expenseTypeValue") {
      dispatch({
        type: "UPDATE",
        [inputName]: value.value,
      });
      setRepeatingSelection(value);
    } else {
      dispatch({
        type: "UPDATE",
        [inputName]: value,
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createMonthlyExpense(state);
    dispatch({
      type: "RESET",
    });
    setRepeatingSelection({ value: 1, label: "One Time Expense" });
    setSubmit((prevSubmit) => {
      return !prevSubmit;
    });
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
    editMonthlyExpense(expenseID, amount);
  };
  const handleMonthlyExpDelete = async (expenseID) => {
    await deleteMonthlyExpense(expenseID);
    setSubmit((prevSubmit) => {
      return !prevSubmit;
    });
  };

  // LOAD TABLE DATA
  React.useEffect(() => {
    const startDateMonthlyExp = moment("1/1/1990").format("YYYY-MM-DD");
    const endDateMonthlyExp = moment("1/1/2100").format("YYYY-MM-DD");
    renderMonthlyExpenseTable(startDateMonthlyExp, endDateMonthlyExp).then(
      (data) => {
        setLoading(false);
        setMonthlyExpDB(data.monthlyExpensesFromDB);
      }
    );
  }, [submit]);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Create Monthly Expenses</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center" style={{ width: "20%" }}>
                        Expense Type
                      </th>
                      <th>Date</th>
                      <th>Expense Name</th>
                      <th>Amount</th>
                      <th className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <CreateNewMonthlyExpense
                      repeatingSelection={repeatingSelection}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      state={state}
                    />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Monthly Expenses</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Date</th>
                      <th>Expense Name</th>
                      <th>Amount</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <MonthlyExpenseFromDB
                      monthlyExpDB={monthlyExpDB}
                      handleMonthlyExpChange={handleMonthlyExpChange}
                      handleMonthlyExpEdit={handleMonthlyExpEdit}
                      handleMonthlyExpDelete={handleMonthlyExpDelete}
                    />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MonthlyExpenses;
