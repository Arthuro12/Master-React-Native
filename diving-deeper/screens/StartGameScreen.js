import { StyleSheet, View, TextInput } from "react-native";

import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
    return <View style={styles.inputContainer}>
        <TextInput />
        <PrimaryButton>Reset</PrimaryButton>
        <PrimaryButton>Confirm</PrimaryButton>
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 100,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#72063c",
        elevation: 8, // Add shadow for android devices
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    }
});

export default StartGameScreen;