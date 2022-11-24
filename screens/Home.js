import { useContext } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Header from "../components/Header";
import MenuButtons from "../components/MenuButtons";
import { AppContext } from "../context/context";
import MapScreen from "./MapScreen";
const HEADER = "Custodian";

function Home({ navigation }) {
    const { currentUser } = useContext(AppContext);
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ height: "100%" }}>
                <Header header={HEADER} />
                <MenuButtons navigation={navigation} />
                {currentUser.role === "Seguridad" ? (
                    <View>
                        <MapScreen />
                    </View>
                ) : (
                    <View>
                        <Text>Aqui van notificaciones</Text>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 15,
        flex: 1,
    },
});
