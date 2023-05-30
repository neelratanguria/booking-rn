import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globals from '../assets/globals';

const Amenities = () => {
  return (
    <View style={styles.amenitiesSectionContainer}>
      <Text style={styles.titles}>Most Popular Facilities</Text>
      <View style={styles.amenitiesContainer}>
        {[
          'Couple Friendly',
          'Dog Friendly',
          'Free WiFi',
          'Swimming Pool',
          'Free Parking',
          'Spa',
          'Fitness Center',
          'Free Parking',
        ].map((amenity, index) => (
          <View style={styles.amenity} key={index}>
            <Text style={styles.amenityText}>{amenity}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({
    amenitiesSectionContainer: {
        margin: 10,
      },
      amenitiesContainer: {
        flexDirection: 'row',
        gap: 15,
        flexWrap: 'wrap',
      },
      amenity: {
        backgroundColor: globals.COLOR.AZURE,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 5,
      },
      amenityText: {
        color: globals.COLOR.CULTURED,
      },
      titles: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
      },
});
