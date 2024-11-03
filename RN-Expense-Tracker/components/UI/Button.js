import { StyleSheet, Pressable, View, Text } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

function Button({ children, style, mode, onPress }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GLOBAL_STYLES.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GLOBAL_STYLES.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GLOBAL_STYLES.colors.primary100,
    borderRadius: 4,
  },
});

export default Button;
