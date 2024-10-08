import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  TextInput,
} from "react-native";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goals, setGoals] = useState([]);

  function goalInputHandler(text) {
    setEnteredGoal(text);
  }

  function addGoal() {
    setGoals((prevState) => {
      setEnteredGoal("");
      return [
        ...prevState,
        { text: enteredGoal, id: Math.random().toString() },
      ];
    });
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal"
          value={enteredGoal}
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoal} />
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical={false}
          data={goals}
          renderItem={(itemData) => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>{itemData.item.text}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        >
          {/* {goals.length > 0
            ? goals.map((goal) => (
                <View style={styles.goalItem} key={goal}>
                  <Text style={styles.goalText}>{goal}</Text>
                </View>
              ))
            : null} */}
        </FlatList>
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
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
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
