import { useState } from "react";
import { StyleSheet, View, TextInput, Alert } from "react-native";

import Label from "../components/ui/Label";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";

import COLORS from "../constants/colors";

function StartGameScreen({ onStartGame }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function handleChangeInput(text) {
    setEnteredNumber(text);
  }

  function handleConfirmInput() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Number has to be a number betwenn 1 and 99.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: handleInvalidNumber,
          },
        ]
      );
      return;
    }

    onStartGame(chosenNumber);
  }

  function handleInvalidNumber() {
    setEnteredNumber("");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.titleContainer}>
        <Title>Guess My Number</Title>
      </View>
      <Card>
        <Label style={styles.inputHeader}>Enter a Number</Label>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={2}
          value={enteredNumber}
          onChangeText={handleChangeInput}
        />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <PrimaryButton>Reset</PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={handleConfirmInput}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
  },
  titleContainer: {
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  input: {
    width: 50,
    height: 50,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomColor: COLORS.accent500,
    borderBottomWidth: 2,
    color: COLORS.accent500,
    marginVertical: 8,
  },
});

export default StartGameScreen;
