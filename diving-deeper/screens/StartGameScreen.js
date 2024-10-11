import { StyleSheet, View, TextInput } from "react-native";

import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} 
                keyboardType="number-pad" 
                maxLength={2} 
            />
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <PrimaryButton>Reset</PrimaryButton>
                </View>
                <View style={styles.button}>
                    <PrimaryButton>Confirm</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#4e0329",
        elevation: 8, // Add shadow for android devices
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    buttons: {
        flexDirection: "row",
    },
    button: {
        flex: 1,
    },
    input: {
        width: 50,
        height: 50,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        borderBottomColor: "#ddb52f",
        borderBottomWidth: 2,
        color: "#ddb52f",
        marginVertical: 8,
    }
});

export default StartGameScreen;