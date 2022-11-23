import { View, StyleSheet, SafeAreaView } from "react-native";
import Header from "../components/Header";
import MenuButtons from "../components/MenuButtons";
const HEADER = "Custodian";

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ height: "100%" }}>
                <Header header={HEADER} />
                <MenuButtons navigation={navigation} />
            </SafeAreaView>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        padding: 15,
        flex: 1,
    },
});
