import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

export default function GoalInput({ visible, onAddGoal }) {
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
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
});
