import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import globals from '../assets/globals';

const actionTypes = {
  inputFirstName: 'inputFirstName',
  inputLastName: 'inputLastName',
  inputEmail: 'inputEmail',
  inputPhoneNumber: 'inputPhoneNumber',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.inputFirstName: {
      return {
        ...state,
        firstName: action.payload,
      };
    }
    case actionTypes.inputLastName: {
      return {
        ...state,
        lastName: action.payload,
      };
    }
    case actionTypes.inputEmail: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case actionTypes.inputPhoneNumber: {
      return {
        ...state,
        phoneNumber: action.payload,
      };
    }
    default: {
      throw new Error();
    }
  }
};

const useUserForm = reducer => {
  const [state, dispatch] = React.useReducer(reducer, {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const setFirstName = firstName =>
    dispatch({type: actionTypes.inputFirstName, payload: firstName});
  const setLastName = lastName =>
    dispatch({type: actionTypes.inputLastName, payload: lastName});

  const setEmail = email =>
    dispatch({type: actionTypes.inputEmail, payload: email});
  const setPhoneNumber = phoneNumber =>
    dispatch({type: actionTypes.inputPhoneNumber, payload: phoneNumber});

  const dispatchers = {
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
  };

  return {
    state,
    dispatchers,
  };
};

const UserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {property} = route.params;

  const {state, dispatchers} = useUserForm(formReducer);

  const navigateToConfirmationScreen = () => {
    navigation.navigate('Confirmation');
  };

  useEffect(() => {
    if (globals.CONFIG.IS_TESTING) {
      setTimeout(() => {
        dispatchers.setFirstName("Neel")
        dispatchers.setLastName("Guria")
        dispatchers.setEmail("neelratan@gmail.com")
        dispatchers.setPhoneNumber("9876543210")
      }, globals.CONFIG.AUTO_SCREEN_CHANGE_DELAY);
      setTimeout(navigateToConfirmationScreen, globals.CONFIG.AUTO_SCREEN_CHANGE_DELAY+1000);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: true,
      title: 'User Details',
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
      <View style={styles.inputContainer}>
        <Text>First Name</Text>
        <TextInput
          value={state.firstName}
          onChangeText={text => dispatchers.setFirstName(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Last Name</Text>
        <TextInput
          value={state.lastName}
          onChangeText={text => dispatchers.setLastName(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          value={state.email}
          onChangeText={text => dispatchers.setEmail(text)}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Phone Number</Text>
        <TextInput
          value={state.phoneNumber}
          onChangeText={text => dispatchers.setPhoneNumber(text)}
          style={styles.textInput}
        />
      </View>

      <Pressable style={styles.bottomContainer}>
        <View>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>Rs {property.oldPrice}</Text>
            <Text style={styles.newPrice}>Rs {property.newPrice}</Text>
          </View>
          <Text>You saved {property.oldPrice - property.newPrice} rupees</Text>
        </View>
        <TouchableOpacity onPress={navigateToConfirmationScreen}>
          <Text style={styles.callToAction}>Final Step</Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  inputContainer: {
    margin: 20,
    flexDirection: 'column',
    gap: 10,
    marginVertical: 10,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    backgroundColor: 'white',
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
  },
  callToAction: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: globals.COLOR.COBALT_BLUE,
    color: 'white',
    fontWeight: 'bold',
  },
});
