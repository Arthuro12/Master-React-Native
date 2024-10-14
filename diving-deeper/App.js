import { useState } from "react";

import { StyleSheet, SafeAreaView, ImageBackground, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

import COLORS from "./constants/colors";

export default function App() {
  const [loaded, error] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    // return <AppLoading />;
  }

  const [userNumber, setUserNumber] = useState(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [totalRound, setTotalRound] = useState(0);

  function handleNumberGuessed() {
    setIsGameOver(true);
  }

  function handleUpdateRound() {
    setTotalRound((prevState) => {
      prevState++;
      return prevState;
    });
  }

  function handleStartGame(pickedNumber) {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  }

  function handleStartNewGame() {
    setUserNumber(null);
    setTotalRound(0);
  }

  let screen = <StartGameScreen onStartGame={handleStartGame} />;

  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onNumberGuessed={handleNumberGuessed}
        onUpdateRound={handleUpdateRound}
      />
    );
  }

  if (userNumber && isGameOver) {
    screen = (
      <GameOverScreen
        totalRound={totalRound}
        userNumber={userNumber}
        onStartNewGame={handleStartNewGame}
      />
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.primary800, COLORS.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        style={styles.rootScreen}
        source={require("./assets/background.png")}
        imageStyle={styles.backgroundImage}
        resizeMethod="cover"
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
