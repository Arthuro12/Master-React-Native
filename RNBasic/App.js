import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function addGoal(enteredGoal) {
    setGoals((prevState) => {
      return [
        ...prevState,
        { text: enteredGoal, id: Math.random().toString() },
      ];
    });
  }

  function deleteGoalHandler(id) {
    setGoals((prevState) => {
      const currGoalIdx = prevState.findIndex((currGoal) => currGoal.id === id);
      prevState.splice(currGoalIdx, 1);
      return [...prevState];
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  return (
    // <View style={styles.container}>
    //   <View>
    //     <Text style={styles.text}>Another piece of text</Text>
    //   </View>
    //   <Text
    //     style={styles.text}
    //     // style={{
    //     //   margin: 16,
    //     //   borderStyle: "solid",
    //     //   borderColor: "red",
    //     //   borderWidth: 2,
    //     //   padding: 12,
    //     // }}
    //   >
    //     Hello World!
    //   </Text>
    //   <Button title="Click me!" />
    // </View>
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput visible={modalIsVisible} onAddGoal={addGoal} />
      <View style={styles.goalsContainer}>
        <FlatList
          keyboardShouldPersistTaps="always"
          alwaysBounceVertical={false}
          data={goals}
          renderItem={(itemData) => {
            return (
              <GoalItem goal={itemData} onDeleteItem={deleteGoalHandler} />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
        {/* {goals.length > 0
            ? goals.map((goal) => (
                <View style={styles.goalItem} key={goal}>
                  <Text style={styles.goalText}>{goal}</Text>
                </View>
              ))
            : null} */}
      </View>
    </View>
  );
}

// Using a stylesheet object to improve reutilisablity
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // text: {
  //   margin: 16,
  //   borderStyle: "solid",
  //   borderColor: "green",
  //   borderWidth: 2,
  //   padding: 12,
  // },
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
