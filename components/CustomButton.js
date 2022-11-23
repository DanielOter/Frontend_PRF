import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const CustomButton = ({ onPress, text }) => {
    return (
        <View style={styles.buttons}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonsText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        alignItems: "center",
        justifyContent: "space-around",
    },
    buttonsText: {
        color: "#ffffff",
        fontSize: 20,
    },
    button: {
        width: 350,
        height: 60,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0470dc",
        borderColor: "#ffffff",
        borderWidth: 2,
        marginTop: 10,
    },
});