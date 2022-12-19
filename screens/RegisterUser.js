import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Form } from "../components/form/Form";

export const RegisterUser = ({ navigation }) => {
    return (
        <View>
            <SafeAreaView style={styles.container}>
                <Form navigation={navigation} tForm={"User"} />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fcfdf5",
        height: "100vh",
    },
});
