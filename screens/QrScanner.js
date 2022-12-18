import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, StyleSheet, Text, View } from "react-native";

export const QrScanner = () => {
    const [hasPermission, sethasPermission] = useState(false);
    const [scanData, setScanData] = useState();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            sethasPermission(status === "granted");
        })();
    }, []);

    if (!hasPermission) {
        return (
            <View>
                <Text>
                    Por favor acepte los permisos de uso en la aplicación
                </Text>
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        const reg = JSON.parse(data);
        setScanData(reg);
        console.log("Data: ", scanData, " Type: ", type);
    };
    console.log(
        "🚀 ~ file: QrScanner.js ~ line 28 ~ handleBarCodeScanned ~ reg",
        scanData?.data.hostName
    );

    return (
        <View style={styles.container}>
            {!scanData ? (
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={
                        scanData ? undefined : handleBarCodeScanned
                    }
                />
            ) : (
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Propietario: {scanData.data.hostName}
                        </Text>
                        <Text style={styles.text}>
                            Invitado: {scanData.data.guestname}
                        </Text>
                        <Text style={styles.text}>
                            Entrada: {scanData.data.entry}
                        </Text>
                        <Text style={styles.text}>
                            Salida: {scanData.data.exit}
                        </Text>
                    </View>
                    <Button
                        title="Scan Again?"
                        onPress={() => {
                            setScanData(undefined);
                        }}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfdf5",
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        paddingBottom: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
