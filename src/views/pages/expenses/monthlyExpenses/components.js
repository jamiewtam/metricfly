import React from "react";
import Select from "react-select";
//COMPONENTS
import { Button, Input } from "reactstrap";
//FUNCTIONS
import { getMonthAndYear } from "../../../../util/formatting/formatDates";

//REDUCER
export const monthlyExpenseReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        ...action,
      };
    case "RESET":
      return {
        name: "Name",
        amount: 0,
        expenseDate: "2020-01",
        expenseTypeValue: 1,
      };
    default:
      return state;
  }
};

// TABLE COMPONENTS
export const CreateNewMonthlyExpense = ({
  handleChange,
  state,
  handleSubmit,
  repeatingSelection,
}) => {
  return (
    <tr>
      <td>
        <Select
          className="react-select info"
          classNamePrefix="react-select"
          name="expenseTypeValue"
          value={repeatingSelection}
          onChange={(event) => {
            handleChange("expenseTypeValue", event);
          }}
          options={[
            { value: 1, label: "One Time Expense" },
            {
              value: "0",
              label: "-- Repeating Expenses --",
              isDisabled: true,
            },
            { value: 2, label: "Repeat for 2 Months" },
            { value: 3, label: "Repeat for 3 Months" },
            { value: 4, label: "Repeat for 4 Months" },
            { value: 5, label: "Repeat for 5 Months" },
            { value: 6, label: "Repeat for 6 Months" },
            { value: 7, label: "Repeat for 7 Months" },
            { value: 8, label: "Repeat for 8 Months" },
            { value: 9, label: "Repeat for 9 Months" },
            { value: 10, label: "Repeat for 10 Months" },
            { value: 11, label: "Repeat for 11 Months" },
            { value: 12, label: "Repeat for 12 Months" },
          ]}
        />
      </td>
      <td>
        <Input
          type="month"
          defaultValue="2020-01"
          onChange={(event) => handleChange("expenseDate", event.target.value)}
        />
      </td>
      <td>
        <Input
          value={state.name}
          placeholder="Name"
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </td>
      <td>
        <Input
          placeholder="0"
          value={state.amount}
          onChange={(event) => handleChange("amount", event.target.value)}
        />
      </td>
      <td>
        <Button
          className="btn-fill"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </td>
    </tr>
  );
};
export const MonthlyExpenseFromDB = ({
  monthlyExpDB,
  handleMonthlyExpChange,
  handleMonthlyExpEdit,
  handleMonthlyExpDelete,
}) => {
  return monthlyExpDB.map((exp) => {
    return (
      <tr key={exp._id}>
        <td className="text-center">{getMonthAndYear(exp.expenseDate)}</td>
        <td>{exp.name}</td>
        <td>
          <Input
            defaultValue={exp.amount}
            onChange={(event) =>
              handleMonthlyExpChange(exp._id, event.target.value)
            }
          />
        </td>
        <td className="text-center">
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => handleMonthlyExpEdit(exp._id, exp.amount)}
          >
            Edit
          </Button>
          <Button onClick={() => handleMonthlyExpDelete(exp._id)}>
            Remove
          </Button>
        </td>
      </tr>
    );
  });
};
