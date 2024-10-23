import { useLayoutEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
// import { useRoute } from "@react-navigation/native";

import MealItem from "../components/MealItem";

import { CATEGORIES, MEALS } from "../data/dummy-data";

function MealsOverviewScreen({ route, navigation }) {
  // const catId = useRoute().params.categoryId;
  const catId = route.params.categoryId;

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (currCategory) => currCategory.id === catId
    ).title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);

  const mealsForCategory = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });

  function renderMealItem(itemData) {
    const mealId = itemData.item.id;

    function handlePress() {
      navigation.navigate("MealDetails", { id: mealId });
    }

    const mealItemProps = {
      title: itemData.item.title,
      url: itemData.item.imageUrl,
      duration: itemData.item.duration,
      complexity: itemData.item.complexity,
      affordability: itemData.item.affordability,
    };

    return <MealItem {...mealItemProps} onPress={handlePress} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={mealsForCategory}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default MealsOverviewScreen;
