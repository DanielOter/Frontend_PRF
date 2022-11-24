import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../../context/context";
import { CustomButton } from "../CustomButton";
import { createGuestService } from "../../services/guestService";

export const GuestForm = ({ getData, validateInputs }) => {
    const { currentUser } = useContext(AppContext);
    const [image, setImage] = useState("");
    const [gError, setGError] = useState("");

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
        } else {
            setGError(
                "Verifique que todos los campos esten completos y la imagen se cargara correctamente."
            );
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
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 200, height: 200 }}
                    />
                )}
                <CustomButton onPress={sendForm} text={"Enviar"} />
                {gError && <Text>{gError}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsText: {
        color: "#ffffff",
        fontSize: 20,
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
});
