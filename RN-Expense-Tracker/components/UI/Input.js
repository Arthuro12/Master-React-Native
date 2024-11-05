import { StyleSheet, View, Text, TextInput } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

function Input({ wrapperStyle, label, textInputConfig, invalid }) {
  const inputStyles = [styles.input];

  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, wrapperStyle]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GLOBAL_STYLES.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GLOBAL_STYLES.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GLOBAL_STYLES.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GLOBAL_STYLES.colors.error500,
  },
  invalidInput: {
    backgroundColor: GLOBAL_STYLES.colors.error50,
  },
});

export default Input;
