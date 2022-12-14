import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { CustomInput } from "../components/form/CustomInput";
import { createNotificationsService } from "../services/notificationService";
import { AppContext } from "../context/context";
import { useNavigation } from "@react-navigation/native";

export const AddNotification = () => {
    const { currentUser } = useContext(AppContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({});
    const [networkError, setNetworkError] = useState("");
    const nav = useNavigation();

    const handleCreateNot = async () => {
        setNetworkError("");
        if (validation()) {
            setError({});
            const newNot = {
                title: title,
                description: description,
            };
            const response = await createNotificationsService(
                newNot,
                currentUser.token
            );
            if (response?.status === 400 || response?.status === 500) {
                setNetworkError(
                    "Hubo un error durante la creacion, intente de nuevo"
                );
            } else {
                nav.navigate("Home", {
                    load: true,
                });
            }
        }
    };
    const validation = () => {
        return true;
    };

    return (
        <View style={styles.container}>
            <CustomInput
                value={title}
                setValue={setTitle}
                holder={"Ingrese un titulo"}
                text={"Titulo"}
                error={error.vUnit}
            />
            <CustomInput
                value={description}
                setValue={setDescription}
                holder={"Ingrese descripcion"}
                text={"descripcion"}
                error={error.vUnit}
            />
            <View style={{ alignItems: "center" }}>
                <Text style={styles.error}>{networkError}</Text>
            </View>
            <CustomButton onPress={handleCreateNot} text={"Enviar"} />
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        color: "#ff0000",
        fontSize: 10,
    },
    container: {
        backgroundColor: "#fcfdf5",
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
});
