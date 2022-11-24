import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const CustomInput = ({ value, setValue, holder, text, error }) => {
    return (
        <View>
            <View>
                <Text style={styles.text}>{text}</Text>
                <View>
                    <TextInput
                        value={value}
                        placeholder={holder}
                        onChangeText={(text) => setValue(text)}
                        style={styles.textInput}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.error}>{error}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginTop: 5,
        color: "#000000",
        fontSize: 15,
    },
    textInput: {
        color: "#000000",
        fontSize: 14,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        placeholderTextColor: "#767476",
        borderWidth: 1,
        paddingLeft: 14,
        width: 350,
        minHeight: 50,
    },
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
});
