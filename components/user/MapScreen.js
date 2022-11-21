import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

 function MapScreen() {

const m = [{latitude: -34.584510, 
  longitude: -58.416899,
  title:"test",
  description:'aca',
  pinColor:'gold'},
]


  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
          initialRegion={{
            latitude: -34.5831892,// ubicacion del barrio
            longitude: -58.41367,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
          showsUserLocation={true}
        >
          {/*alertas*/}
          {m.map((item) => ( 
              <Marker
              coordinate={{latitude: item.latitude,longitude: item.longitude}}
              title={item.title}
              description={item.description}
              pinColor='red'
              />


          ))}

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