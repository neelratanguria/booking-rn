import {StyleSheet, Text, TextInput, View} from 'react-native';
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

  useEffect(() => {
    console.log(state)
  }, [state])
  

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
          style={styles.textInput} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          value={state.email}
          onChangeText={text => dispatchers.setEmail(text)}
          style={styles.textInput} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Phone Number</Text>
        <TextInput
          value={state.phoneNumber}
          onChangeText={text => dispatchers.setPhoneNumber(text)}
          style={styles.textInput} />
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 10,
    marginVertical: 10,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});
