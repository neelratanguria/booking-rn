import {Pressable, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import globals from '../assets/globals';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {property, selectedDates, rooms, children, adults} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: true,
      title: 'Confirmation',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: globals.COLOR.PRIMARY_BLUE,
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.nameSectionContainer}>
        <View style={{flex: 2}}>
          <Text style={styles.propertyName}>{property.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{property.rating}</Text>
            <View style={styles.geniusLevelContainer}>
              <Text style={styles.geniusLevelText}>Genius Level</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            ...styles.tagContainer,
            flex: 1,
          }}>
          <Text style={styles.tagText}>Travel Sustainable</Text>
        </View>
      </View>

      <View style={styles.datesContainer}>
        <View>
          <Text style={styles.titles}>Check-In</Text>
          <Text style={styles.infoText}>{selectedDates.startDate}</Text>
        </View>
        <View>
          <Text style={styles.titles}>Check-Out</Text>
          <Text style={styles.infoText}>{selectedDates.endDate}</Text>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <Text style={styles.titles}>Rooms and guests</Text>
        <Text style={styles.infoText}>
          {rooms}
          {rooms > 1 ? ' rooms ' : ' room '}
          {adults}
          {adults > 1 ? ' adults ' : ' adult '}
          {children}
          {children > 1 ? ' children ' : ' child '}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.callToActionButton}
        onPress={() => {}}>
        <Text style={styles.callToActionText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
  },
  nameSectionContainer: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyName: {
    fontSize: 20,
    fontWeight: 'bold',
    // maxWidth: 240
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 7,
  },
  geniusLevelContainer: {
    backgroundColor: globals.COLOR.COBALT_BLUE,
    flexShrink: 1,
    padding: 3,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
  },
  geniusLevelText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  tagContainer: {
    backgroundColor: globals.COLOR.CARLSBERG_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 10,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
  },
  datesContainer: {
    flexDirection: 'row',
    gap: 60,
    margin: 10,
  },
  titles: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  infoText: {
    color: globals.COLOR.AZURE,
    fontWeight: 'bold',
  },
  countsContainer: {
    margin: 10,
  },
  callToActionButton: {
    backgroundColor: globals.COLOR.PRIMARY_BLUE,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  callToActionText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
