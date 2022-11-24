import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeData } from "../helpers/store";
import keys from "../constants/keys";
import { auth } from "../libs/auth";
import { signOut } from "firebase/auth";
import { AppContext } from "../context/context";
import menuOptions from "../constants/menuOptions";

const MenuButtons = ({ navigation }) => {
    const { setLoading, currentUser } = useContext(AppContext);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        if (currentUser) {
            // const role = currentUser.role;
            const role = "Propietario"
            if (role === "Administrador") setMenu(menuOptions.Administrador);
            if (role === "Seguridad") setMenu(menuOptions.Seguridad);
            if (role === "Propietario") setMenu(menuOptions.Propietario);
        }
    }, [menu]);

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
        if (nav === "LogOut") {
            handleSignOut();
        } else {
            navigation.navigate(nav);
        }
    };

    return (
        <View>
            <View style={styles.container}>
                {menu.map((items, index) => (
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
});
