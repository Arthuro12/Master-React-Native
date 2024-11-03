import { StyleSheet, View, Text } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.summary}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GLOBAL_STYLES.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  period: {
    fontSize: 12,
    color: GLOBAL_STYLES.colors.primary400,
  },
  summary: {
    fontSize: 16,
    fontWeight: "bold",
    color: GLOBAL_STYLES.colors.primary500,
  },
});

export default ExpensesSummary;
