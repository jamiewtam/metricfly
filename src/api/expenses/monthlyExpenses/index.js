import Swal from "sweetalert2";

import {
  editTableExpense,
  deleteTableExpense,
  createNewExpenseItem,
  createRepeatingExpenseItem,
  renderMonthlyExpenses,
} from "./dataFetching";
import { repeatingMonthlyExpCalculator } from "./factoryFunctions/repeatingMonthlyExpCalc";

//CREATE MONTHLY EXPENSE -------------------------------------
export const createMonthlyExpense = ({
  name,
  amount,
  expenseDate,
  expenseTypeValue,
}) => {
  if (expenseTypeValue === 1) {
    if (name && amount && expenseDate !== "Invalid date") {
      createNewExpenseItem(name, amount, expenseDate);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter a Date, Name, and Amount",
      });
    }
  }

  if (expenseTypeValue >= 2) {
    if (name && amount && expenseDate !== "Invalid date") {
      const repeatingExpArr = repeatingMonthlyExpCalculator(
        name,
        amount,
        expenseTypeValue,
        expenseDate
      );

      createRepeatingExpenseItem(repeatingExpArr);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter a Date, Name, and Amount",
      });
    }
  }
};

//EDIT EXPENSE ITEM FROM MONTHLY EXPENSE TABLE -------------------------------------
export const editMonthlyExpense = (expenseID, newAmount) => {
  console.log(expenseID, newAmount);
  if (newAmount || newAmount === 0) {
    editTableExpense(expenseID, newAmount);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please Enter In a Number",
    });
  }
};

//DELETE EXPENSE ITEM FROM MONTHLY EXPENSE TABLE -------------------------------------
export const deleteMonthlyExpense = (expenseID) => {
  deleteTableExpense(expenseID);
};

export const renderMonthlyExpenseTable = (startDate, endDate) => {
  return renderMonthlyExpenses(startDate, endDate);
};
