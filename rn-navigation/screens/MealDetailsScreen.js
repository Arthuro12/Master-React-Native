import { useLayoutEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";

import MealDetails from "../components/MealDetails";
import Subtitle from "../components/mealdetails/Subtitle";
import List from "../components/mealdetails/List";
import IconButton from "../components/IconButton";

import { MEALS } from "../data/dummy-data";

function MealDetailsScreen({ route, navigation }) {
  const mealId = route.params.id;
  const selectedMeal = MEALS.find((currMeal) => currMeal.id === mealId);

  function handleButtonPressed() {
    console.log("Pressed!");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton icon="star" color="white" onPress={handleButtonPressed} />
        );
      },
    });
  }, [navigation, handleButtonPressed]);

  return (
    <ScrollView style={styles.rootContainer}>
      <View>
        <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.affordability}
          textStyle={styles.detailText}
        />
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <Subtitle>Ingredients</Subtitle>
            <List items={selectedMeal.ingredients} />
            <Subtitle>Steps</Subtitle>
            <List items={selectedMeal.steps} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: { color: "white" },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});

export default MealDetailsScreen;
