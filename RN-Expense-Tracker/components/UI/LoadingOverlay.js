import { StyleSheet, View, ActivityIndicator } from "react-native";

import { GLOBAL_STYLES } from "../../constants/styles";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white"></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GLOBAL_STYLES.colors.primary700,
  },
});

export default LoadingOverlay;
