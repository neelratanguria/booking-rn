import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useRef, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import globals from '../assets/globals';

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mapView = useRef(null);
  const searchResults = route.params.searchResults;

  const coordinates = [];
  const details = searchResults.map(item =>
    item.properties.map((property, index) => {
        coordinates.push( {
            latitude: Number(property.latitude),
            longitude: Number(property.longitude)
        }
        )
    }),
  );

  useEffect(() => {
    setTimeout(() => {
        mapView.current.fitToCoordinates(coordinates, {
            edgePadding: {
                top: 80,
                bottom: 80,
                right: 20,
                left: 20
            }
        })
    }, 700)
  }, [])
  

  return (
    <>
      <MapView
        style={styles.map}
        ref={mapView}
        >
        {searchResults.map(item =>
          item.properties.map((property, index) => (
            <Marker
              title={property.name}
              key={index}
              coordinate={{
                latitude: parseFloat(property.latitude),
                longitude: parseFloat(property.longitude),
              }}>
              <Pressable style={styles.marker}>
                <Text style={styles.markerPrice}>{property.newPrice}</Text>
              </Pressable>
            </Marker>
          )),
        )}
      </MapView>
    </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: globals.COLOR.PRIMARY_BLUE,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
  },
  markerPrice: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
