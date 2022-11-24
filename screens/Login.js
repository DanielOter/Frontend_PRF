import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
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
    const [password, setPassword] = useState("contraseña");
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
                .then(async ({ user }) => {
                    logInService(user.email, user.stsTokenManager, setLoading);
                    setNetworkError({});
                })
                .catch((error) => {
                    validateNetworkError(error);
                    console.log(error);
                });
            setLoading(true);
        }
    };

    return (
        <View style={styles.container}>
            <CustomInput
                value={email}
                setValue={setEmail}
                holder={"Ingresar email"}
                text={"Email"}
                error={error.emailError}
            />
            <CustomInput
                value={password}
                setValue={setPassword}
                holder={"Ingresar Password"}
                text={"Password"}
                error={error.passwordError}
            />
            <CustomButton onPress={handleLogIn} text={"Login"} />
            <View>
                <Text style={styles.error}>
                    {networkError.emailOrPasswordInvalidError ||
                        networkError.networkError}{" "}
                </Text>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
});
