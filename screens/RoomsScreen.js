import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import globals from '../assets/globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Amenities from '../components/Amenities';

const RoomsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {property, adults, children, rooms, selectedDates} = route.params;

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if(globals.CONFIG.IS_TESTING) {
      setTimeout(() => {
        setSelected(property.rooms[0].name)
      }, 
        globals.CONFIG.AUTO_SCREEN_CHANGE_DELAY)
      setTimeout(navigateToUserScreen, 
        globals.CONFIG.AUTO_SCREEN_CHANGE_DELAY+1000)
    }
  }, [])

  const navigateToUserScreen = () => {
    navigation.navigate('User', {
      property: property,
      adults: adults,
      children: children,
      rooms: rooms,
      selectedDates: selectedDates,
    });
  }
  

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
    <>
      <ScrollView>
        {property.rooms.map((item, index) => (
          <Pressable style={styles.roomsContainer} key={index}>
            <View style={styles.nameSection}>
              <Text style={styles.nameText}>{item.name}a</Text>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={globals.COLOR.AZURE}
              />
            </View>
            <Text style={styles.payText}>Pay at the property</Text>
            <Text style={styles.cancellationText}>
              Free cancellation available
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.oldPrice}>Rs {property.oldPrice}</Text>
              <Text style={styles.newPrice}>Rs {property.newPrice}</Text>
            </View>
            <Amenities />
            {selected?.includes(item.name) ? (
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionButtonText}>SELECTED</Text>
                <Ionicons
                  onPress={() => {
                    setSelected(null);
                  }}
                  name="close-circle-outline"
                  size={28}
                  color="red"
                  style={styles.closeButton}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setSelected(item.name)}
                style={styles.actionButton}>
                <Text style={styles.actionButtonText}>SELECT</Text>
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>
      {selected && (
        <TouchableOpacity
          onPress={navigateToUserScreen}
          style={{
            ...styles.actionButton,
            backgroundColor: globals.COLOR.AZURE,
            margin: 5,
          }}>
          <Text style={{...styles.actionButtonText, color: 'white'}}>
            RESERVE
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default RoomsScreen;

const styles = StyleSheet.create({
  roomsContainer: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 17,
    color: globals.COLOR.AZURE,
  },
  payText: {
    marginVertical: 3,
    fontSize: 14,
  },
  cancellationText: {
    color: 'green',
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 4,
    alignItems: 'center',
  },
  oldPrice: {
    fontSize: 18,
    color: 'red',
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontSize: 18,
    color: 'red',
  },
  actionButton: {
    borderColor: globals.COLOR.ARGENTINIAN_BLUE,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: globals.COLOR.AZURE,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    flexGrow: 1,
  },
  callToActionText: {},
});
