import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import errors from "../constants/errors";
import fireErrors from "../constants/fireBaseErrors";
import { auth } from "../libs/auth";
import { AppContext } from "../context/context";
import { logInService } from "../services/userService";
import { CustomInput } from "../components/form/CustomInput";
import { CustomButton } from "../components/CustomButton";

function Login() {
    const [email, setEmail] = useState("admin@admin.com");
    const [password, setPassword] = useState("Contrasena2");
    const [error, setError] = useState({});
    const [networkError, setNetworkError] = useState({});
    const { setLoading } = useContext(AppContext);

    const validateFormError = () => {
        let emailError = "";
        let passwordError = "";
        if (!email) {
            emailError = errors.MAIL_lOG;
        }
        if (!password) {
            passwordError = errors.PASS_lOG;
        }
        if (emailError || passwordError) {
            setError({ emailError, passwordError });
            return false;
        }
        return true;
    };

    const validateNetworkError = (error) => {
        let emailOrPasswordInvalidError;
        let networkError;
        if (
            error.message === fireErrors.EMAIL_INVALID ||
            error.message === fireErrors.PASSWORD_INVALID ||
            error.message === fireErrors.EMAIL_NOT_EXISTS
        ) {
            emailOrPasswordInvalidError = errors.FIRE_LOGIN;
        }

        if (emailOrPasswordInvalidError === undefined) {
            networkError = errors.FIRE_NETWORK;
        }
        setNetworkError({
            emailOrPasswordInvalidError,
            networkError,
        });
    };

    const handleLogIn = () => {
        if (validateFormError()) {
            setError({});
            signInWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    logInService(user.email, user.stsTokenManager, setLoading);
                    setNetworkError({});
                })
                .catch((error) => {
                    validateNetworkError(error);
                    console.log(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Image
                    style={{ height: 160, width: 250 }}
                    source={require("../assets/titledLogo.png")}
                />
                <CustomInput
                    value={email}
                    setValue={setEmail}
                    holder={"Email"}
                    text={"Email"}
                    error={error.emailError}
                />
                <CustomInput
                    value={password}
                    setValue={setPassword}
                    holder={"Password"}
                    text={"Password"}
                    error={error.passwordError}
                    isPass={true}
                />
                <CustomButton onPress={handleLogIn} text={"Login"} />
                <View>
                    <Text style={styles.error}>
                        {networkError.emailOrPasswordInvalidError ||
                            networkError.networkError}{" "}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 2,
        width: 380,
        borderColor: "#b48a4d",
        backgroundColor: "#fcfdf5",
    },
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 500,
        padding: "20px",
        color: "#b48a4d",
    },
});
