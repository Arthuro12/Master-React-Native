import { StyleSheet, View, Text, Pressable } from "react-native";

export default function GoalItem({ goal, onDeleteItem }) {
  function deleteGoal() {
    onDeleteItem(goal.item.id);
  }

  return (
    <View style={styles.goalItem}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={() => deleteGoal()}
      >
        <Text style={styles.goalText}>{goal.item.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
