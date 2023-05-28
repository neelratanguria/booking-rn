import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {pixelNormalize} from '../utils/normalise';
import globals from '../assets/globals';

const PropertyInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const photos = route.params.property.photos;
  const dates = route.params.selectedDates;
  const {rooms, children, adults, property} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: true,
      title: property.name,
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
    <View>
      <ScrollView>
        <Pressable style={styles.imageContainer}>
          {photos.slice(0, 5).map((photo, index) => (
            <View key={index}>
              <Image source={{uri: photo.image}} style={styles.image} />
            </View>
          ))}
          <Pressable style={styles.showMoreContainer}>
            <Text>Show More</Text>
          </Pressable>
        </Pressable>

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

        <View style={styles.border} />

        <Text style={styles.priceForText}>
          Price for 1 Night and {adults} {adults > 1 ? 'adults' : 'adult'}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>{property.oldPrice * adults}</Text>
          <Text style={styles.newPrice}>Rs {property.newPrice * adults}</Text>
        </View>

        {property.oldPrice !== property.newPrice ? (
          <View style={{flexDirection: 'row'}}>
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>
                {Math.round(
                  100 - (property.newPrice / property.oldPrice) * 100,
                )}
                % Off
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}

        <View style={styles.border} />

        <View style={styles.datesContainer}>
          <View>
            <Text style={styles.titles}>Check-In</Text>
            <Text style={styles.infoText}>{dates.startDate}</Text>
          </View>
          <View>
            <Text style={styles.titles}>Check-Out</Text>
            <Text style={styles.infoText}>{dates.endDate}</Text>
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

        <View style={styles.border} />

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

        <View style={styles.border} />

        <View style={styles.callToActionContainer}>
          <TouchableOpacity style={styles.callToActionButton}>
            <Text style={styles.callToActionText}>Select Availabilty</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default PropertyInfoScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    gap: 5,
  },
  image: {
    width: 115,
    height: pixelNormalize(80),
    borderRadius: pixelNormalize(4),
  },
  showMoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 115,
    backgroundColor: 'gray',
    borderRadius: pixelNormalize(4),
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
  border: {
    backgroundColor: globals.COLOR.GRAY_100,
    height: 1,
    margin: 10,
  },
  priceForText: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  priceContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 12,
    marginTop: 14,
  },
  oldPrice: {
    color: 'red',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 20,
  },
  discountContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: globals.COLOR.CARLSBERG_GREEN,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  discountText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
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
  callToActionContainer: {
    margin: 10,
    marginBottom: 50
  },
  callToActionButton: {
    backgroundColor: globals.COLOR.PRIMARY_BLUE,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  callToActionText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
