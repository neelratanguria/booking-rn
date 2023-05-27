import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import PropertyControl from '../components/PropertyControl';
import globals from '../assets/globals';
import {propertiesData} from '../assets/data/propertiesData';
import PropertyCard from '../components/PropertyCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import SortFilterModal from '../components/SortModal';

const actionTypes = {
  toggleModal: 'toggleModal',
  setFilter: 'setFilter',
};

const modalControlsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.toggleModal: {
      return {
        ...state,
        modalVisible: !state.modalVisible,
      };
    }
    case actionTypes.setFilter: {
      return {
        ...state,
        selectedFilter: action.payload,
      };
    }
    default: {
      throw new Error();
    }
  }
};

const useModalControls = reducer => {
  const [modalState, dispatch] = React.useReducer(reducer, {
    modalVisible: true,
    selectedFilter: null,
  });

  const toggleModal = () =>
    dispatch({type: actionTypes.toggleModal, payload: null});
  const setFilter = filter =>
    dispatch({type: actionTypes.setFilter, payload: filter});

  const modalDispatchers = {
    toggleModal,
    setFilter,
  };

  return {
    modalState,
    modalDispatchers,
  };
};

const PlacesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [sortedData, setSortedData] = useState(propertiesData);

  const {modalState, modalDispatchers} = useModalControls(modalControlsReducer);

  const searchPlaces = propertiesData?.filter(
    item => item.place === route.params.place,
  );

  const compareHTL = (a, b) => {
    if (a.newPrice > b.newPrice) {
      return -1;
    }
    if (a.newPrice < b.newPrice) {
      return 1;
    }
    return 0;
  };
  const compareLTH = (a, b) => {
    if (a.newPrice > b.newPrice) {
      return 1;
    }
    if (a.newPrice < b.newPrice) {
      return -1;
    }
    return 0;
  };

  const applyFilter = filter => {
     modalDispatchers.toggleModal()
    switch (filter) {
      case 'cost:High to Low': {
        searchPlaces.map(val => val.properties.sort(compareHTL));
        setSortedData(searchPlaces);
        break;
      }
      case 'cost:Low to High': {
        searchPlaces.map(val => val.properties.sort(compareLTH));
        setSortedData(searchPlaces);
        break;
      }
    }
  };

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
        <PropertyControl modalDispatchers={modalDispatchers} />
        <ScrollView>
          {sortedData
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
        modalState={modalState}
        modalDispatchers={modalDispatchers}
        applyFilter={applyFilter}
      />
    </SafeAreaView>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  propertyScroll: {
    backgroundColor: globals.COLOR.WHITE_100,
  },
});
