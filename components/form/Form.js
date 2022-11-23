import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import regex from "../../constants/regex";
import errors from "../../constants/errors";
import { GuestForm } from "./GuestForm";
import { UserForm } from "./UserForm";
import Header from "../Header";
import { CustomInput } from "./CustomInput";

export const Form = ({ tForm }) => {
    const [formFor, setformFor] = useState("");
    const [error, setError] = useState({});
    const [name, setName] = useState("Pedro");
    const [lastName, setLName] = useState("Infante");
    const [docType, setDocType] = useState("dni");
    const [docNum, setDocNum] = useState("123456789");

    useEffect(() => {
        if (tForm) setformFor(tForm);
    }, []);

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
            <View style={styles.container}>
                <Header header={formFor + " form"}></Header>
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
                    {formFor === "User" ? (
                        <View>
                            <UserForm
                                getData={getData}
                                validateInputs={validateInputs}
                            />
                        </View>
                    ) : (
                        <View>
                            <GuestForm
                                getData={getData}
                                validateInputs={validateInputs}
                            />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    info: {
        width: "100%",
        borderRadius: 5,
        height: 50,
        borderWidth: 1,
        borderColor: "#484648",
        padding: 12,
        justifyContent: "center",
    },
    buttons: {
        alignItems: "center",
        justifyContent: "space-around",
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
        marginTop: 20,
    },
    buttonsText: {
        color: "#ffffff",
        fontSize: 20,
    },
    textInputHolders: {
        width: "50%",
        paddingBottom: 20,
    },
    text: {
        marginTop: 5,
        paddingLeft: 15,
        color: "#000000",
        fontSize: 15,
    },
    textInput: {
        color: "#000000",
        fontSize: 14,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        placeholderTextColor: "#767476",
        borderWidth: 1,
        paddingLeft: 14,
        minHeight: 50,
        minHeight: 50,
    },
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
    rolesButton: {
        width: 110,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CBC3E3",
        borderColor: "#ffffff",
        borderWidth: 2,
        marginTop: 10,
    },
    roleText: {
        color: "#ffffff",
        fontSize: 15,
    },
});
