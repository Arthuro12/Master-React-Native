import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";

import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import { GLOBAL_STYLES } from "../constants/styles";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);

  const selectedExpense = expenseId
    ? expensesCtx.expenses.find((currExpense) => currExpense.id === expenseId)
    : null;

  function handleCancelDelete() {
    navigation.goBack();
  }

  async function handleConfirm(expense) {
    setIsSubmitting(true);
    if (isEditing) {
      await updateExpense(expenseId, expense);
      expensesCtx.updateExpense(expenseId, expense);
    } else {
      const id = await storeExpense(expense);
      expensesCtx.addExpense({ ...expense, id: id });
    }
    navigation.goBack();
  }

  async function handleDeleteExpense() {
    setIsSubmitting(true);
    await deleteExpense(expenseId);
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation]);

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValue={selectedExpense}
        submitButtonLabel={isEditing ? "Edit" : "Add"}
        onCancel={handleCancelDelete}
        onSubmit={handleConfirm}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GLOBAL_STYLES.colors.error500}
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GLOBAL_STYLES.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GLOBAL_STYLES.colors.primary200,
    alignItems: "center",
  },
  // flexRow: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // buttonConfigStyle: {
  //   minWidth: 120,
  //   marginHorizontal: 8,
  // },
});

export default ManageExpense;
