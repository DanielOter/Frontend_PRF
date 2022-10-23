import React, { useContext, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

import keys from "../constants/keys";
import errors from "../constants/fireBaseErrors";
import { storeData } from "../helpers/store";
import { auth } from "../libs/auth";
import { createRequest, createUrl } from "../helpers/request";
import { AppContext } from "../context/context";

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [networkError, setNetworkError] = useState({});
    const { setLoading } = useContext(AppContext);

    const validateFormError = () => {
        let emailError = "";
        let passwordError = "";
        if (!email) {
            emailError = "Email Field is Invalid ";
        }
        if (!password) {
            passwordError = "Password field is required";
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
            error.message === errors.EMAIL_INVALID ||
            error.message === errors.PASSWORD_INVALID ||
            error.message === errors.EMAIL_NOT_EXISTS
        ) {
            emailOrPasswordInvalidError = "Email o contraseña incorrecta";
        }

        if (emailOrPasswordInvalidError === undefined) {
            networkError = "Network Error Try again";
        }
        setNetworkError({
            emailOrPasswordInvalidError,
            networkError,
        });
    };

    const handleCreateAccount = () => navigation.navigate("Register");

    const handleSignIn = () => {
        if (validateFormError()) {
            setError({});
            signInWithEmailAndPassword(auth, email, password)
                .then(async ({ user }) => {
                    const request = createRequest(
                        user.stsTokenManager.accessToken,
                        "POST"
                    );
                    const url = createUrl("signin");
                    fetch(url, request)
                        .then((response) => response.json())
                        .then((json) => {
                            setNetworkError({});
                            const userData = JSON.stringify({
                                email: user.email,
                                accessToken: user.stsTokenManager.accessToken,
                                nickname: json.nickname,
                            });
                            storeData(keys.USER, userData);
                            console.log("Signed in!");
                            setLoading(true);
                            return json;
                        })
                        .catch((error) => {
                            console.log(error);
                            throw error;
                        });
                })
                .catch((error) => {
                    validateNetworkError(error);
                    console.log(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textInputHolders}>
                <Text style={styles.text}>Email</Text>
                <View style={styles.info}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Fakeemail@gmail.com"
                        placeholderTextColor="#767476"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <Text style={styles.error}>{error.emailError} </Text>
            </View>

            <View style={styles.textInputHolders}>
                <Text style={styles.text}>Password</Text>
                <View style={styles.info}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#767476"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <Text style={styles.error}>
                    {error.passwordError || networkError.passLengthError}{" "}
                </Text>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                    <Text style={styles.buttonsText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleCreateAccount}
                    style={styles.button}
                >
                    <Text style={styles.buttonsText}>Sign up</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: "center",
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
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
});
