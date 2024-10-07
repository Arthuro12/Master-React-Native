import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
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
      <View>
        <TextInput placeholder="Your course goal" />
        <Button title="Add Goal" />
      </View>
      <View>
        <Text>List of goals</Text>
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
    padding: 50,
  },
});
