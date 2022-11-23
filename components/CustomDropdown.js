import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CustomDropdown = ({ data, holder, setValue, value, error }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.interContainer}>
                    <Dropdown
                        style={[
                            styles.dropdown,
                            isFocus && { borderColor: "blue" },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="value"
                        valueField="value"
                        placeholder={!isFocus ? "Seleccione " + holder : "..."}
                        searchPlaceholder="Buscar..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            </View>
        </View>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignContent: "center",
    },
    interContainer: {
        // padding: 20,
        borderRadius: 15,
    },
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
});
