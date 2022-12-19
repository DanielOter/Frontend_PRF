import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { QrCodeGenerator } from "./QrCodeGenerator";
import { captureScreen } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";

export const QrCode = ({ data }) => {
    const [QRref, setQRref] = useState();
    const [hasPermission, setHasPermission] = useState();
    const ref = useRef();

    useEffect(() => {
        (async () => {
            const mediaLibraryPermissions =
                await MediaLibrary.requestPermissionsAsync();
            setHasPermission(mediaLibraryPermissions.status === "granted");
        })();
    }, []);

    const isMobile = Platform.OS === "android";
    console.log(Platform.OS);

    const takeScreenShot = (option) => {
        captureScreen({
            format: "jpg",
            quality: 0.8,
        }).then(
            (uri) => {
                if (option === "save") {
                    MediaLibrary.saveToLibraryAsync(uri).then(() => {
                        setQRref(undefined);
                    });
                    alert("Se guardo el Qr en la galeria");
                } else {
                    shareAsync(uri).then(() => {
                        setQRref(undefined);
                    });
                }
            },
            (error) => console.error("Oops, Something Went Wrong", error)
        );
    };

    if (!hasPermission) {
        return (
            <View>
                <Text>
                    Por favor acepte los permisos de uso en la aplicación
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Text style={styles.qrText}>QR Code</Text>
                    <QrCodeGenerator
                        value={JSON.stringify({
                            data: data,
                        })}
                        getRef={(c) => setQRref(c)}
                    />
                    {isMobile && (
                        <View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    takeScreenShot("save");
                                }}
                            >
                                <Text style={styles.save}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    takeScreenShot("share");
                                }}
                            >
                                <Text style={styles.save}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fcfdf5",
        alignItems: "center",
        flex: 1,
    },

    button: {
        borderRadius: 30,
        padding: 15,
        bottom: 0,
        width: "100%",
        alignItems: "center",
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        color: "#fff",
        backgroundColor: "#273746",
    },

    qrText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },

    save: {
        color: "#fff",
        fontSize: 16,
        textTransform: "capitalize",
    },
});
