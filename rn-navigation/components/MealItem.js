import {
  StyleSheet,
  Platform,
  View,
  Pressable,
  Text,
  Image,
} from "react-native";

import MealDetails from "./MealDetails";

function MealItem({
  title,
  url,
  duration,
  complexity,
  affordability,
  onPress,
}) {
  return (
    <View style={styles.mealItem}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={onPress}
      >
        <View>
          <View>
            <Image style={styles.image} source={{ uri: url }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          {/* <View style={styles.details}>
            <Text style={styles.detailItem}>{duration}m</Text>
            <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
            <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
          </View> */}
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  content: {
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },
});

export default MealItem;
