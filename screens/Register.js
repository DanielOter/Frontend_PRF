import React, { useContext, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import keys from "../constants/keys";
import errors from "../constants/fireBaseErrors";
import { storeData } from "../helpers/store";
import { auth } from "../libs/auth";
import { createRequest, createUrl } from "../helpers/request";
import { AppContext } from "../context/context";

function Register({ navigation }) {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [networkError, setNetworkError] = useState({});
    const { setLoading } = useContext(AppContext);

    const validateFormError = () => {
        let nicknameError = "";
        let emailError = "";
        let passwordError = "";
        if (!nickname) {
            nicknameError = "Nickname field is required";
        }
        if (!email) {
            emailError = "Email Field is Invalid ";
        }
        if (!password) {
            passwordError = "Password field is required";
        }
        if (emailError || nicknameError || passwordError) {
            setError({ nicknameError, emailError, passwordError });
            return false;
        }
        return true;
    };

    const validateNetworkError = (error) => {
        let emailExistError;
        let networkError;
        let passLengthError;

        if (error.message === errors.EMAIL_IN_USED) {
            emailExistError = "Email ya existe";
        }

        if (error.message === errors.EMAIL_MAX) {
            passLengthError = "Password debe ser de un minimo de 6 characters";
        }
        if (emailExistError === undefined && passLengthError === undefined) {
            networkError = "Network Error Try again";
        }
        setNetworkError({
            passLengthError,
            emailExistError,
            networkError,
        });
    };

    const handleCreateAccount = () => {
        if (validateFormError()) {
            setError({});
            createUserWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    console.log("Account created!");
                    const userData = JSON.stringify({
                        email: user.email,
                        accessToken: user.stsTokenManager.accessToken,
                    });

                    const body = { nickname };
                    const request = createRequest(
                        user.stsTokenManager.accessToken,
                        "POST",
                        body
                    );
                    const url = createUrl("signin");

                    fetch(url, request)
                        .then((response) => response.json())
                        .then((json) => {
                            setNetworkError({});
                            storeData(keys.USER, userData);
                            setLoading(true);
                        })
                        .catch((error) => {
                            console.error(error);
                            throw error;
                        });
                })
                .catch((error) => {
                    console.log(error);
                    validateNetworkError(error);
                });
        }
    };

    const handleLogin = () => navigation.navigate("Login");

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
                <Text style={styles.error}>
                    {error.emailError || networkError.emailExistError}{" "}
                </Text>
            </View>

            <View style={styles.textInputHolders}>
                <Text style={styles.text}>Nickname</Text>
                <View style={styles.info}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nickname"
                        placeholderTextColor="#767476"
                        onChangeText={(text) => setNickname(text)}
                    />
                </View>
                <Text style={styles.error}>{error.nicknameError} </Text>
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
                <TouchableOpacity
                    onPress={handleCreateAccount}
                    style={styles.button}
                >
                    <Text style={styles.buttonsText}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonsText}>
                        Already have an account?
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.error}>{networkError.networkError} </Text>
            </View>
        </View>
    );
}

export default Register;

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
