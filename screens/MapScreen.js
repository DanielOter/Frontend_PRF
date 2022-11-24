import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

function MapScreen() {
    const m = [
        {
            id: 1,
            latitude: -34.58451,
            longitude: -58.416899,
        },
    ];

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <View style={styles.container}>
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
                {/*alertas*/}
                {m.map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        title={item.title}
                        description={item.description}
                        pinColor="red"
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
