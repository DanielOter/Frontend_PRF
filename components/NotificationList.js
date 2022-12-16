import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { getNotificationsService } from "../services/notificationService";

const not = [{ title: "Not1", descrption: "Descripcion" }];

export const NotificationList = () => {
    const [notifications, setNotifications] = useState();

    useEffect(() => {
        (async () => {
            const response = await getNotificationsService();
            setNotifications(response);
        })();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.notContainer}>
            <Text style={styles.title}>{item.not_title}</Text>
            <Text>{item.not_descrption}</Text>
        </View>
    );

    console.log(notifications);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.title}>Lista de Notificaciones</Text>
            </View>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.not_id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        display: "flex",
        width: "100%",
    },
    notContainer: {
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
});
