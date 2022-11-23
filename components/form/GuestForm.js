import React, { useContext, useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../../context/context";
import { createRequest, createUrl } from "../../helpers/request";
import { CustomButton } from "../CustomButton";

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
        const base64 = image.uri.split(",")[1];
        const imageBase = `data:image/jpeg;base64,${base64}`;
        console.log(
            "🚀 ~ file: GuestForm.js ~ line 24 ~ uploadImage ~ image",
            image
        );

        if (!image.cancelled) {
            setImage({ uri: image.uri, type: image.type });
        }
    };
    const sendForm = async () => {
        if (validateInputs() && image) {
            const data = getData();
            const base64 = image.uri.split(",")[1];
            const body = {
                guest: {
                    name: data.name,
                    lastName: data.lastName,
                    idType: data.docType,
                    idNum: data.docNum,
                    host: currentUser.email,
                },
                // file: `data:image/jpeg;base64,${base64}`,
            };
            // const body = new FormData();

            // const file = {
            //     uri: image.uri,
            //     type: "image/jpeg",
            //     name: data.name + "-" + data.docNum + ".jpg",
            // };
            // body.append("file", file);
            // body.append("guest[name]", data.name);
            // body.append("guest[lastName]", data.lastName);
            // body.append("guest[idType]", data.docType);
            // body.append("guest[idNum]", data.docNum);
            // body.append("guest[host]", currentUser.mail);

            const url = createUrl("guest/create");

            const request = createRequest(
                currentUser.accessToken,
                "POST",
                body
            );
            // const request = {
            //     method: "post",
            //     headers: {
            //         "content-type": "multipart/form-data;",
            //         Authorization: `Bearer ${currentUser.accessToken}`,
            //     },
            //     body: JSON.stringify(body),
            // };
            const res = await fetch(url, request)
                .then((res) => res.json())
                .then((json) => {
                    return json;
                })
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
            console.log(
                "🚀 ~ file: GuestForm.js ~ line 74 ~ sendForm ~ res",
                res
            );
        } else {
            setGError(
                "Verifique que todos los campos esten completos y la imagen se cargara correctamente."
            );
        }
    };
    return (
        <View>
            <View style={styles.container}>
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
    container: {
        alignItems: "center",
    },
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
