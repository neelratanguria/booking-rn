import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import PropertyControl from '../components/PropertyControl';
import globals from '../assets/globals';
import {propertiesData} from '../assets/data/propertiesData';
import PropertyCard from '../components/PropertyCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import SortFilterModal from '../components/SortModal';

const PlacesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisibile, setModalVisibile] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null)

  const searchPlaces = propertiesData?.filter((item) => item.place === route.params.place)

  const compare = () => {
    
  }

  const applyFilter = (filter) => {
    setModalVisibile(false)
    switch(filter) {
        case 'cost:High to Low': {
            searchPlaces.map((val) => val.properties.sort(compare))
        }
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: true,
      title: 'Popular Places',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
  }, []);

  return (
    <SafeAreaView>
      <View>
        <PropertyControl />
        <ScrollView>
          {console.log()}
          {propertiesData
            ?.filter(item => item.place === route.params.place)[0]
            ?.properties.map((property, index) => (
              <PropertyCard
                key={index}
                property={property}
                rooms={route.params?.counts?.countRoom}
                children={route.params?.counts?.countChildren}
                adults={route.params?.counts?.countAdult}
                selectedDates={route.params?.selectedDates}
                availableRooms={property.rooms}
              />
            ))}
        </ScrollView>
      </View>
      <SortFilterModal
        visible={modalVisibile}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        applyFilter={applyFilter}/>
    </SafeAreaView>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  propertyScroll: {
    backgroundColor: globals.COLOR.WHITE_100,
  },
});
