import { StyleSheet, View } from "react-native";

import COLORS from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    backgroundColor: COLORS.primary800,
    elevation: 8, // Add shadow for android devices
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Card;
