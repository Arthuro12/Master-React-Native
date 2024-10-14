import { StyleSheet, Text } from "react-native";

import COLORS from "../../constants/colors";

function Label({ style, children }) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.accent500,
    fontFamily: "open-sans",
    fontSize: 24,
  },
});

export default Label;
