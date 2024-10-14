import { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import Label from "../components/ui/Label";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onNumberGuessed, onUpdateRound }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currGuess, setCurrGuess] = useState(initialGuess);

  useEffect(() => {
    if (currGuess === userNumber) {
      onNumberGuessed();
    }
  }, [currGuess, userNumber, onNumberGuessed]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function handleNextGuess(direction) {
    if (
      (direction === "lower" && currGuess < userNumber) ||
      (direction === "greater" && currGuess > userNumber)
    ) {
      Alert.alert("Don´t lie!", "You know that this is wrong...", [
        {
          text: "sorry",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currGuess;
    } else {
      minBoundary = currGuess + 1;
    }

    const nextGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currGuess
    );
    setCurrGuess(nextGuess);
    onUpdateRound();
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent´s Guess</Title>
      <NumberContainer>{currGuess}</NumberContainer>
      <Card>
        <Label style={styles.buttonsLabel}>Higher or lower</Label>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess("lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess("greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View>{/* LOG ROUNDS */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  buttonsLabel: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default GameScreen;
