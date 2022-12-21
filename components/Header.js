import { Text, View, StyleSheet, Image } from "react-native";

const Header = ({ header }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>{header}</Text>
            </View>
            <View>
                <Image
                    style={{ height: 40, width: 50 }}
                    source={require("../assets/onlyLogo.png")}
                />
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomColor: "#b48a4d",
        borderBottomWidth: 2,
        paddingTop: 50,
        backgroundColor: "#fcfdf5",
        flexDirection: "row",
    },
    heading: {
        color: "#b48a4d",
        fontSize: 20,
        fontWeight: "bold",
    },
});
