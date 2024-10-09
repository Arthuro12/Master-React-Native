import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

export default function GoalInput({ visible, onAddGoal, onCloseAddGoalModal }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputGoal(text) {
    setInputValue(text);
  }

  function addGoalHandler() {
    onAddGoal(inputValue);
    setInputValue("");
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          value={inputValue}
          onChangeText={handleInputGoal}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCloseAddGoalModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  // addGoalButton: {},
  // cancelButton: {

  // }
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});
