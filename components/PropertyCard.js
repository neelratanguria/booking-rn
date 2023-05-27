import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globals from '../assets/globals';

const {width, height} = Dimensions.get('window');

const PropertyCard = ({
  rooms,
  children,
  adults,
  property,
  selectedDates,
  availableRooms,
}) => {
  return (
    <View>
      <Pressable style={styles.cardContainer}>
        <View>
          <Image source={{uri: property.image}} style={styles.propertyImage} />
        </View>
        <View style={styles.propertyContent}>
          <View style={styles.propertyNameContainer}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <Ionicons name="ios-heart-outline" size={24} color="red" />
          </View>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{property.rating}</Text>
            <View style={styles.geniusLevelContainer}>
              <Text style={styles.geniusLevelText}>Genius Level</Text>
            </View>
          </View>

          <Text style={styles.address}>
            {property.address.length > 50
              ? property.address.substr(0, 50)
              : property.address}
          </Text>

          <Text style={styles.priceForText}>
            Price for 1 Night and {adults} {adults > 1 ? 'adults' : 'adult'}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>{property.oldPrice * adults}</Text>
            <Text style={styles.newPrice}>Rs {property.newPrice * adults}</Text>
          </View>

          <View style={styles.roomsContainer}>
            <Text style={styles.room}>Deluxe Room</Text>
            <Text style={styles.room}>Hotel Room: 1 bed</Text>
          </View>

          <View style={styles.dealContainer}>
            <Text style={styles.deal}>Limited Time deal</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  propertyImage: {
    flexGrow: 1,
    width: width - 250,
  },
  propertyContent: {
    flexGrow: 1,
    padding: 10,
  },
  propertyNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyName: {
    maxWidth: 200,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 7,
  },
  geniusLevelContainer: {
    backgroundColor: globals.COLOR.BLUE_LIGHT,
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
  address: {
    maxWidth: 200,
    marginTop: 6,
    color: 'gray',
    fontWeight: 'bold',
  },
  priceForText: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '500',
  },
  priceContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oldPrice: {
    color: 'red',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 18,
  },
  roomsContainer: {
    marginTop: 6,
  },
  room: {
    fontSize: 16,
    color: 'gray',
  },
  dealContainer: {
    backgroundColor: globals.COLOR.GLAUCOUS,
    flexShrink: 1,
    padding: 3,
    borderRadius: 5,
    width: 150,
    justifyContent: 'center',
    paddingHorizontal: 3,
    paddingVertical: 2,
    marginTop: 2,
  },
  deal: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
});
