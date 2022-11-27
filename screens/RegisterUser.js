import React from "react";
import { SafeAreaView, View } from "react-native";
import { Form } from "../components/form/Form";

export const RegisterUser = ({navigation}) => {
    return (
        <View>
            <SafeAreaView style={{ height: "100%" }}>
                <Form navigation={navigation} tForm={"User"} />
            </SafeAreaView>
        </View>
    );
};
