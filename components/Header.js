import { Text, View, StyleSheet } from "react-native";

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Profile</Text>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomColor: "#1f1f1f",
        borderBottomWidth: 2,
    },
    heading: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "700",
    },
});
