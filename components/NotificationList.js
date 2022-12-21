import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { getNotificationsService } from "../services/notificationService";

export const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        (async () => {
            await getNotificationsService()
                .then((res) => {
                    if (res.length > notifications.length) {
                        setNotifications(res);
                    }
                })
                .catch((err) => {
                    console.log(
                        "🚀 ~ file: NotificationList.js:13 ~ awaitgetNotificationsService ~ err",
                        err
                    );
                });
        })();
    });

    const renderItem = ({ item }) => (
        <View style={styles.notContainer}>
            <Text style={styles.title}>{item.not_title}</Text>
            <Text>{item.not_descrption}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.title}>Lista de Notificaciones</Text>
            </View>
            {notifications ? (
                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.not_id}
                />
            ) : (
                <View style={styles.center}>
                    <Text>No hay notificaciones pendientes para mostrar</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fcfdf5",
        display: "flex",
        width: "100%",
        padding: 10,
    },
    notContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        marginTop: 15,
        padding: 10,
    },
    title: {
        fontWeight: "bold",
        alignItems: "center",
    },
    center: {
        alignItems: "center",
    },
});
