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
  navigateToMap: 'navigateToMap',
};

const controlsReducer = (state, action) => {
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

const useControls = reducer => {
  const [controlsState, dispatch] = React.useReducer(reducer, {
    modalVisible: false,
    selectedFilter: null,
  });

  const toggleModal = () =>
    dispatch({type: actionTypes.toggleModal, payload: null});
  const setFilter = filter =>
    dispatch({type: actionTypes.setFilter, payload: filter});
  const navigateToMap = () =>
    dispatch({type: actionTypes.navigateToMap, payload: null});

  const controlsDispatchers = {
    toggleModal,
    setFilter,
    navigateToMap,
  };

  return {
    controlsState,
    controlsDispatchers,
  };
};

const PlacesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [sortedData, setSortedData] = useState(propertiesData);

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
    controlsDispatchers.toggleModal();
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

  const {controlsState, controlsDispatchers} = useControls(controlsReducer);

  return (
    <>
      <View>
        <PropertyControl controlsDispatchers={controlsDispatchers}
            navigateToMap={() => navigation.navigate("Map", {
                searchResults: searchPlaces
            })}/>
        <ScrollView>
          {sortedData
            ?.filter(item => item.place === route.params.place)[0]
            ?.properties.map((property, index) => (
              <PropertyCard
                key={index}
                index={index}
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
        controlsState={controlsState}
        controlsDispatchers={controlsDispatchers}
        applyFilter={applyFilter}
      />
    </>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  propertyScroll: {
    backgroundColor: globals.COLOR.CULTURED,
  },
});
