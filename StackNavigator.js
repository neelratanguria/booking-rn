import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'

import Ionicons from 'react-native-vector-icons/Ionicons';

import SavedScreen from './screens/SavedScreen'
import BookingScreen from './screens/BookingScreen'

import ProfileScreen from './screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'


const StackNavigator = () => {
    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()

    function BottomTabs() {
        return(
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        headerShown: false,
                        tabBarIcon: ({focused}) => focused ? (
                            <Ionicons name="home" size={24} color="black" />
                        ) : (
                            <Ionicons name="home-outline" size={24} color="black" />
                        )
                    }}/>
                <Tab.Screen
                    name='Saved'
                    component={SavedScreen}
                    options={{
                        tabBarLabel: "Saved",
                        headerShown: false,
                        tabBarIcon: ({focused}) => focused ? (
                            <Ionicons name="heart" size={24} color="black" />
                        ) : (
                            <Ionicons name="ios-heart-outline" size={24} color="black" />
                        )
                    }}/>
                <Tab.Screen
                    name='Bookings'
                    component={BookingScreen}
                    options={{
                        tabBarLabel: "Bookings",
                        headerShown: false,
                        tabBarIcon: ({focused}) => focused ? (
                            <Ionicons name="notifications" size={24} color="black" />
                        ) : (
                            <Ionicons name="notifications-outline" size={24} color="black" />
                        )
                    }}/>
                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        headerShown: false,
                        tabBarIcon: ({focused}) => focused ? (
                            <Ionicons name="person" size={24} color="black" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="black" />
                        )
                    }}/>
            </Tab.Navigator>
        )
    }
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Main' component={BottomTabs} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator