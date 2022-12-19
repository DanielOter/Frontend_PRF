import MapView, { Marker, ProviderTypes } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import {
    createAlertService,
    getAllAlerts,
    turnOffAlert,
} from "../services/alertService";
import { AppContext } from "../context/context";

function MapScreen() {
    const [markers, setMarkers] = useState([]);
    const [location, setLocation] = useState();
    const { alarm, currentUser, setAlarm } = useContext(AppContext);
    const abortController = new AbortController();
    const [intervalId, setInvervalId] = useState(0);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let local = await Location.getCurrentPositionAsync({});
            setLocation(local);

            if (alarm) {
                const data = {
                    email: currentUser.email,
                    latitude: local.coords.latitude,
                    longitude: local.coords.longitude,
                };
                await createAlertService(data, currentUser.token);
                setAlarm(false);
            }

            if ("Seguridad" === "Seguridad") {
                const countId = setInterval(() => {
                    getAlerts();
                }, 10000);
                setInvervalId(countId);
            }
        })();
        return () => abortController.abort();
    }, []);

    const getAlerts = async () => {
        const response = await getAllAlerts(currentUser.token);
        const marks = response.map((marker) => {
            return {
                id: marker.alert_id,
                latitude: marker.alert_latitud,
                longitude: marker.alert_longitud,
            };
        });
        setMarkers(marks);
    };

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    const removeMarker = async (id) => {
        setMarkers((current) =>
            current.filter((markers) => {
                return markers.id !== id;
            })
        );
        const response = await turnOffAlert(id);
        console.log(
            "🚀 ~ file: MapScreen.js ~ line 73 ~ removeMarker ~ response",
            response
        );
    };

    return (
        <View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -34.5831892, // ubicacion del barrio
                    longitude: -58.41367,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0221,
                }}
                showsUserLocation={true}
            >
                {markers.map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        title={item.title}
                        description={item.description}
                        pinColor={item.pincolor}
                        onPress={() => removeMarker(item.id)}
                    />
                ))}
            </MapView>
        </View>
    );
}

export default MapScreen;

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("screen").height,
    },
});
