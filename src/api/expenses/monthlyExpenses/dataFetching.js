import Swal from "sweetalert2";
import { authAxios } from "../../axios";

//CREATE MONTHLY EXPENSE OR REPEATING MONTHLY EXPENSE -------------------------------------
export const createNewExpenseItem = async (
  expenseName,
  expenseAmount,
  expenseDate
) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "expense/createMonthlyExpense",
      data: {
        name: expenseName,
        amount: expenseAmount,
        expenseDate,
      },
    });
    if (res.data.status === "success") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your Expense Has Been Saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (err) {
    console.log(err);
    console.log("error", err.response.data.message);
  }
};

export const createRepeatingExpenseItem = async (expenseArr) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "expense/createRepeatingMonthlyExpense",
      data: {
        expenseArr,
      },
    });
    if (res.data.status === "success") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your Expense Has Been Saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

//EDIT MONTHLY EXPENSE OR REPEATING MONTHLY EXPENSE -------------------------------------
export const editTableExpense = async (expenseId, newAmount) => {
  console.log("expenseId, newAmount");
  try {
    const axios = authAxios();
    const res = await axios({
      method: "PATCH",
      url: "expense/editMonthlyExpense",
      data: {
        expenseId,
        newAmount,
      },
    });

    if (res.data.status === "success") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: `Your Expense is Now ${res.data.data.newAmount}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

//DELETE MONTHLY EXPENSE OR REPEATING MONTHLY EXPENSE -------------------------------------
export const deleteTableExpense = async (expenseId) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "DELETE",
      url: "expense/deleteMonthlyExpense",
      data: {
        expenseId,
      },
    });
    if (res.data.status === "success") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: `Expense Deleted`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};

// RENDER MONTHLY EXPENSES -------------------------------------
export const renderMonthlyExpenses = async (startDate, endDate) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "expense/renderMonthlyExpenses",
      data: {
        startDate,
        endDate,
      },
    });
    if (res.data.status === "success") {
      const monthlyExpensesFromDB = res.data.data.monthlyExpensesFromDB;
      const monthlyExpensesTotalWithDateDiff =
        res.data.data.monthlyExpensesTotalWithDateDiff;

      return { monthlyExpensesTotalWithDateDiff, monthlyExpensesFromDB };
    }
  } catch (err) {
    console.log("error", err.response.data.message);
  }
};
