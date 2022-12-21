import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Platform, LogBox } from "react-native";
import Header from "../components/Header";
import MenuButtons from "../components/MenuButtons";
import { NotificationList } from "../components/NotificationList";
import { AppContext } from "../context/context";
import MapScreen from "./MapScreen";
const HEADER = "Custodian";

function Home({ navigation }) {
    const { currentUser } = useContext(AppContext);

    const isMobile = () => {
        return Platform.OS === "android";
    };

    useEffect(() => {
        LogBox.ignoreLogs(["AsyncStorage has been extracted"]);
    }, []);

    return (
        <View style={styles.container}>
            <Header header={HEADER} />
            <MenuButtons navigation={navigation} />
            {currentUser?.role === "Seguridad" && isMobile ? (
                <View>
                    <MapScreen />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <NotificationList />
                </View>
            )}
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fcfdf5",
        height: "100%",
    },
});
