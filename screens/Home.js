import { useContext } from "react";
import { View, StyleSheet, SafeAreaView, Text, Platform } from "react-native";
import Header from "../components/Header";
import MenuButtons from "../components/MenuButtons";
import { NotificationList } from "../components/NotificationList";
import { AppContext } from "../context/context";
import MapScreen from "./MapScreen";
const HEADER = "Custodian";

function Home({ navigation }) {
    // const user = userAuth();
    const { currentUser } = useContext(AppContext);
    const isMobile = () => {
        return Platform.OS === "android";
    };

    return (
        <View style={styles.container}>
            <Header header={HEADER} />
            <MenuButtons navigation={navigation} />
            {currentUser?.role === "Seguridad" && isMobile ? (
                <View>
                    <MapScreen />
                </View>
            ) : (
                <View>
                    <NotificationList />
                </View>
            )}
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100vh",
    },
});
