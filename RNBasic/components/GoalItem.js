import { StyleSheet, View, Text, Pressable } from "react-native";

export default function GoalItem({ goal, onDeleteItem }) {
  function deleteGoal() {
    console.log(goal.item.text);
    onDeleteItem(goal.item.id);
  }

  return (
    <Pressable onPress={() => deleteGoal()}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{goal.item.text}</Text>
      </View>
    </Pressable>
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
});
