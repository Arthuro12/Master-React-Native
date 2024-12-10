import { useState } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput } from "react-native";

import ImagePicker from "../ui/ImagePicker.js";
import LocationPicker from "./LocationPicker.js";

import { Colors } from "../../colors.js";

function PlaceForm() {
  const [title, setTitle] = useState("");

  function handleChangeTitle(text) {
    setTitle(text);
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleChangeTitle}
        />
        <ImagePicker />
        <LocationPicker />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
