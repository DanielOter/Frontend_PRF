import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import regex from "../../constants/regex";
import errors from "../../constants/errors";
import { GuestForm } from "./GuestForm";
import { UserForm } from "./UserForm";
import Header from "../Header";
import { CustomInput } from "./CustomInput";

export const Form = ({ tForm, navigation }) => {
    const [error, setError] = useState({});
    const [name, setName] = useState("Pedro");
    const [lastName, setLName] = useState("Infante");
    const [docType, setDocType] = useState("dni");
    const [docNum, setDocNum] = useState("123456789");

    const getData = () => {
        const data = {
            name: name,
            lastName: lastName,
            docType: docType,
            docNum: docNum,
        };
        return data;
    };

    const validateInputs = () => {
        let vName = "";
        let vIDType = "";
        let vIDNum = "";
        let vLName = "";
        let correctInfo = true;

        if (!name.match(regex.FULL_NAME)) {
            vName = errors.NAME;
            correctInfo = false;
        }

        if (!lastName.match(regex.FULL_NAME)) {
            vLName = errors.L_NAME;
            correctInfo = false;
        }

        if (!docType.match(regex.TYPE_ID)) {
            vIDType = errors.ID_TYPE;
            correctInfo = false;
        }

        if (!docNum.match(regex.ID_NUM)) {
            vIDNum = errors.ID_NUM;
            correctInfo = false;
        }

        if (correctInfo == false) {
            setError({
                vName,
                vLName,
                vIDType,
                vIDNum,
            });
        }
        return correctInfo;
    };

    return (
        <View>
            <ScrollView>
                <Header header={tForm + " form"}></Header>
                <View style={styles.container}>
                    <View>
                        <CustomInput
                            value={name}
                            setValue={setName}
                            holder={"Ingresar Nombre"}
                            text={"Nombre"}
                            error={error.vName}
                        />
                        <CustomInput
                            value={lastName}
                            setValue={setLName}
                            holder={"Ingresar Apellido"}
                            text={"Apellido"}
                            error={error.vLName}
                        />
                        <CustomInput
                            value={docType}
                            setValue={setDocType}
                            holder={"Ingresar Tipo de Documento"}
                            text={"Tipo de Documento"}
                            error={error.vIDType}
                        />
                        <CustomInput
                            value={docNum}
                            setValue={setDocNum}
                            holder={"Numero de Documento"}
                            text={"Numero de Documento"}
                            error={error.vIDNum}
                        />
                        {tForm === "User" ? (
                            <View>
                                <UserForm
                                    getData={getData}
                                    validateInputs={validateInputs}
                                    navigation={navigation}
                                />
                            </View>
                        ) : (
                            <View>
                                <GuestForm
                                    getData={getData}
                                    validateInputs={validateInputs}
                                    nav={navigation}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fcfdf5",
        flex: 1,
    },
});
