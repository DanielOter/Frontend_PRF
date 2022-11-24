import React from "react";
import { SafeAreaView, View } from "react-native";
import { Form } from "../components/form/Form";

export const RegisterUser = () => {
    return (
        <View>
            <SafeAreaView style={{ height: "100%" }}>
                <Form tForm={"User"} />
            </SafeAreaView>
        </View>
    );
};
