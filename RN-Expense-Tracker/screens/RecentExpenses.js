import { useContext, useEffect, useState } from "react";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { ExpensesContext } from "../store/expenses-context";

import { fetchExpenses } from "../util/http";
import { getDateMinusDay } from "../util/date";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((currExpense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDay(today, 7);
    const addedaT = new Date(currExpense.date);

    return addedaT > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
