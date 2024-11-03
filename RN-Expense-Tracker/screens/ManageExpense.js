import { useLayoutEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";

import { ExpensesContext } from "../store/expenses-context";

import { GLOBAL_STYLES } from "../constants/styles";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);

  function handleCancelDelete() {
    navigation.goBack();
  }

  function handleConfirmlDelete() {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, {
        description: "A new shoes",
        date: new Date("2024-10-31"),
        amount: 74.99,
      });
    } else {
      expensesCtx.addExpense({
        id: "e11",
        description: "A test",
        date: new Date("2024-11-01"),
        amount: 77.99,
      });
    }
    navigation.goBack();
  }

  function handleDeleteExpense() {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Button
          style={styles.buttonConfigStyle}
          mode="flat"
          onPress={handleCancelDelete}
        >
          Cancel
        </Button>
        <Button style={styles.buttonConfigStyle} onPress={handleConfirmlDelete}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfigStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpense;
