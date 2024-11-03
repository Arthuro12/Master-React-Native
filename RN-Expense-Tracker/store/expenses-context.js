import { createContext, useReducer } from "react";

import { DUMMY_EXPENSES } from "../data/dummy-expenses";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amout, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amout, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];
    case "UPDATE":
      const currentExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const currExpense = state[currentExpenseIndex];
      const updatedExpense = { ...currExpense, ...action.payload.data };
      //   const updatedExpenses = {
      //     ...state,
      //     updatedExpense,
      //   };
      const updatedExpenses = [...state];
      updatedExpenses[currentExpenseIndex] = updatedExpense;

      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
