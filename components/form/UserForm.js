import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import errors from "../../constants/errors";
import fireBaseErrors from "../../constants/fireBaseErrors";
import regex from "../../constants/regex";
import { AppContext } from "../../context/context";
import { auth } from "../../libs/auth";
import { addUserService } from "../../services/userService";
import { CustomButton } from "../CustomButton";
import CustomDropdown from "../CustomDropdown";
import { CustomInput } from "./CustomInput";

const ROLES = [
    { value: "Administrador" },
    { value: "Seguridad" },
    { value: "Propietario" },
];

export const UserForm = ({ getData, validateInputs, navigation }) => {
    const { currentUser } = useContext(AppContext);
    const [role, setRole] = useState("");
    const [unit, setUnit] = useState("1A");
    const [numContact, setNumContact] = useState("12345678"); // 50
    const [mailContact, setMailContact] = useState("dsadas@dasd.com"); // 50
    const [error, setError] = useState({});
    const [networkError, setNetworkError] = useState("");

    const handleCreateUser = () => {
        setNetworkError("");
        if (validateInputs() && validation()) {
            setError({});
            const data = getData();
            createUserWithEmailAndPassword(auth, mailContact, "contraseña")
                .then(async ({ user }) => {
                    const newUser = {
                        name: data.name,
                        lastName: data.lastName,
                        idNum: data.docNum,
                        idType: data.docType,
                        mail: mailContact,
                        phone: numContact,
                        role: role,
                        uid: user.uid,
                    };
                    const response = await addUserService(
                        newUser,
                        currentUser.token
                    );
                    if (response?.status === 400) {
                        setNetworkError(errors.SV_EXISTS_ID);
                    } else {
                        navigation.navigate("Home");
                    }
                })
                .catch((error) => {
                    validateNetworkError(error);
                });
        }
    };

    const validateNetworkError = (error) => {
        if (error.message === fireBaseErrors.EMAIL_IN_USED) {
            setNetworkError(errors.FIRE_EXISTS_MAIL);
        }
    };

    const validation = () => {
        let vRole = "";
        let vUnit = "";
        let vNumContact = "";
        let vMail = "";
        let correctInfo = true;

        if (role == "none") {
            vRole = errors.ROLE;
            correctInfo = false;
        }

        if (!unit.match(regex.UNIT)) {
            vUnit = errors.UNIT;
            correctInfo = false;
        }

        if (!numContact.match(regex.NUM_CONTACT)) {
            vNumContact = errors.NUM_CONTACT;
            correctInfo = false;
        }

        if (!mailContact.match(regex.MAIL)) {
            vMail = errors.MAIL;
            correctInfo = false;
        }

        if (correctInfo == false) {
            setError({
                vRole,
                vUnit,
                vNumContact,
                vMail,
            });
        }
        return correctInfo;
    };

    return (
        <View>
            <View>
                <CustomInput
                    value={unit}
                    setValue={setUnit}
                    holder={"Ingresar Unidad"}
                    text={"Unidad"}
                    error={error.vUnit}
                />
                <CustomInput
                    value={numContact}
                    setValue={setNumContact}
                    holder={"Ingresar Numero de Contacto"}
                    text={"Numero de Contacto"}
                    error={error.vNumContact}
                />
                <CustomInput
                    value={mailContact}
                    setValue={setMailContact}
                    holder={"Ingresar Mail"}
                    text={"Mail"}
                    error={error.vMail}
                />
                <CustomDropdown
                    data={ROLES}
                    holder={"Seleccione un rol"}
                    setValue={setRole}
                    value={role}
                    error={error.vRole}
                />
                {networkError && (
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.error}>{networkError}</Text>
                    </View>
                )}
                <CustomButton onPress={handleCreateUser} text={"Registrar"} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
