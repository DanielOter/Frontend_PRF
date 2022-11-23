import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeData } from "../helpers/store";
import keys from "../constants/keys";
import { auth } from "../libs/auth";
import { signOut, updateCurrentUser } from "firebase/auth";
import { AppContext } from "../context/context";
import MapScreen from "./user/MapScreen";

const MenuButtons = ({ navigation }) => {
    const { setLoading } = useContext(AppContext);

    const items = [
        {
            id: 1,
            logo: "comments",
            title: "Chat Room",
            nav: "Room",
            customColor: "#ff751f",
        },
        {
            id: 2,
            logo: "child",
            title: "Friends",
            nav: "Friends",
        },
        {
            id: 3,
            logo: "sign-out",
            title: "LogOut",
            nav: "Login",
        },
    ];

    const handleSignOut = () => {
        console.log("SignOut");
        signOut(auth)
            .then(() => {
                removeData(keys.USER);
                setLoading(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const accion = (nav) => {
        if (nav === "Login") {
            handleSignOut();
        } else {
            navigation.navigate(nav);
        }
    };


    
    return (
        <View>
            <View style={styles.container}>
                {items.map((items, index) => (
                    <View key={index} style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => accion(items.nav)}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: items.customColor
                                        ? items.customColor
                                        : "#0470dc",
                                },
                            ]}
                        >
                            <FontAwesome
                                name={items.logo}
                                size={23}
                                color={"#efefef"}
                            />
                        </TouchableOpacity>
                        <Text style={styles.menuText}>{items.title}</Text>
                    </View>
                ))}
            </View>
            {true ? (        
            <View >
                <MapScreen />
            </View>
            ):(
                <View/>
            )}

        </View>
    );
};

export default MenuButtons;

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        paddingBottom: 10,
        borderBottomColor: "#1f1f1f",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainer: {
        alignItems: "center",
        flex: 1,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0470dc",
    },
    menuText: {
        color: "#858585",
        fontSize: 12,
        paddingTop: 10,
        fontWeight: "600",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
