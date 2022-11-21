import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

 function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
          initialRegion={{
            latitude: -34.5831892,
            longitude: -58.41367,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
        >
                  <Marker
          coordinate={{latitude: -34.581290,longitude: -58.420546}}
          title="test"
          description='aca'
          pinColor='gold'
          />

        </MapView>

    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height 

    // height: Dimensions.get() - 15,
  },
});