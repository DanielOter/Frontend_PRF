import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../form/CustomInput";
import errors from "../../constants/errors";
import {
    updatePassword,
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import regex from "../../constants/regex";
import { async } from "@firebase/util";

const ChangePass = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const nav = useNavigation();

    useEffect(() => {
        (async () => {
            setModalVisible(!modalVisible);
        })();
    }, []);

    const changeStatus = () => {
        setModalVisible(!modalVisible);
        nav.navigate("Home");
    };

    const validation = () => {
        let valid = true;
        if (!newPassword.match(regex.PASS)) {
            setError(errors.PASS);
            valid = false;
        }
        return valid;
    };

    const getUser = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        return user;
    };

    const handleConfirm = async () => {
        setError("");
        if (validation()) {
            updatePassword(getUser(), newPassword)
                .then(() => {
                    Alert.alert("Se ha cambiado la contraseña");
                    changeStatus();
                })
                .catch((e) => {
                    Alert.alert("Reingrese a la app para actualizar credenciales");
                });
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    changeStatus();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Cambio de Contraseña
                        </Text>
                        <CustomInput
                            value={newPassword}
                            setValue={setNewPassword}
                            holder={"Contraseña Nueva"}
                            isPass={true}
                        />
                        <View style={styles.buttons}>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => changeStatus()}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonAccept]}
                                onPress={() => handleConfirm()}
                            >
                                <Text style={styles.textStyle}>Aceptar</Text>
                            </Pressable>
                        </View>
                        {error && (
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.error}>{error}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ChangePass;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonAccept: {
        backgroundColor: "#2196F3",
    },
    buttonCancel: {
        backgroundColor: "#f00",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
    },
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
});
