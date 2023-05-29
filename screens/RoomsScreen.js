import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import globals from '../assets/globals'

const RoomsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { property } = route.params

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
      <Text>RoomsScreen</Text>
    </View>
  )
}

export default RoomsScreen

const styles = StyleSheet.create({})