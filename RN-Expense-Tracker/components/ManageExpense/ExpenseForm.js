import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { GLOBAL_STYLES } from "../../constants/styles";

function ExpenseForm({ defaultValue, submitButtonLabel, onCancel, onSubmit }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue?.amount.toString() ?? "",
      isValid: true,
    },
    date: {
      value: defaultValue?.date.toISOString().slice(0, 10) ?? "",
      isValid: true,
    },
    description: {
      value: defaultValue?.description ?? "",
      isValid: true,
    },
  });

  function handleChangedInput(enteredValue, inputIdentifier) {
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function handleSubmit() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = !isNaN(expenseData.date.getTime());
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input(s)", "Please check your input values!");
      setInputs((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: amountIsValid },
          date: { value: prevState.date.value, isValid: dateIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.spacedRow}>
        <Input
          wrapperStyle={styles.row}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => handleChangedInput(value, "amount"),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
        />
        <Input
          wrapperStyle={styles.row}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLenght: 10,
            onChangeText: (value) => handleChangedInput(value, "date"),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => handleChangedInput(value, "description"),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.centeredRow}>
        <Button style={styles.buttonConfigStyle} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.buttonConfigStyle} onPress={handleSubmit}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  spacedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flex: 1,
  },
  centeredRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfigStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GLOBAL_STYLES.colors.error500,
    margin: 8,
  },
});

export default ExpenseForm;
