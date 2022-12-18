import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../../context/context";
import { CustomButton } from "../CustomButton";
import { createGuestService } from "../../services/guestService";
import errors from "../../constants/errors";
import { useNavigation } from "@react-navigation/native";

export const GuestForm = ({ getData, validateInputs }) => {
    const { currentUser } = useContext(AppContext);
    const [image, setImage] = useState("");
    const [gError, setGError] = useState("");
    const nav = useNavigation();

    const uploadImage = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!image.cancelled) {
            setImage({ uri: image.uri, type: image.type });
        }
    };
    const sendForm = async () => {
        if (validateInputs() && image) {
            const data = getData();
            const guest = {
                name: data.name,
                lastName: data.lastName,
                idType: data.docType,
                idNum: data.docNum,
                host: currentUser.email,
            };

            const resCreation = await createGuestService(
                guest,
                currentUser.accessToken
            );
            console.log(
                "🚀 ~ file: GuestForm.js ~ line 42 ~ sendForm ~ resCreation",
                resCreation
            );
            if (resCreation.status === 400) {
                setGError(errors.GUEST_EXISTS);
            } else {
                nav.navigate("Home");
            }
        } else {
            setGError(errors.FORM_ERROR);
        }
    };
    return (
        <View>
            <View>
                <CustomButton
                    onPress={uploadImage}
                    text={"Seleccione foto del documento"}
                />
                {image && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: image.uri }}
                            style={{
                                width: 200,
                                height: 200,
                            }}
                        />
                    </View>
                )}
                <CustomButton onPress={sendForm} text={"Enviar"} />
                {gError && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.error}>{gError}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfdf5",
    },
    imageContainer: {
        alignItems: "center",
    },
    buttonsText: {
        color: "#ffffff",
        fontSize: 20,
        backgroundColor: "#fff",
    },
    errorContainer: {
        alignItems: "center",
    },
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
});
