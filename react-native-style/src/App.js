import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { viewStyles, textStyles } from "./styles";

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: "green" }]}>
                Inline Styleing -Text
            </Text>
            <Text style={[styles.text, styles.error]}>
                Inline Styleing -Error
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        padding: 10,
        fontSize: 26,
        fontWeight: "600",
        color: "black",
    },
    error: {
        fontWeight: "400",
        color: "red",
    },
});

export default App;
