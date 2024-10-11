import { StyleSheet, View, Text } from "react-native";

function PrimaryButton({ children }) {
    return <View>
        <Text>{children}</Text>
    </View>
}

const styles = StyleSheet.create({

});

export default PrimaryButton;