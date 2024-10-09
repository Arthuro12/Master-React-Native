import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";

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
        <Image style={styles.image} source={require("../assets/goal.png")} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          value={inputValue}
          onChangeText={handleInputGoal}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button color="#b180f0" title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button
              color="#f31282"
              title="Cancel"
              onPress={onCloseAddGoalModal}
            />
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
    backgroundColor: "#311b6b",
    padding: 16,
  },
  textInput: {
    width: "100%",
    color: "#120438",
    backgroundColor: "#e4d0ff",
    borderWidth: 1,
    borderColor: "#e4d0ff",
    borderRadius: 6,
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
