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
import SearchScreen from './screens/SearchScreen'
import PlacesScreen from './screens/PlacesScreen'
import MapScreen from './screens/MapScreen'


const StackNavigator = () => {
    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    initialParams={{input: "Bangalore"}}
                    options={{
                        tabBarLabel: "Home",
                        headerShown: true,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="home" size={24} color="#003580" />
                        ) : (
                            <Ionicons name="home-outline" size={24} color="black" />
                        )
                    }} />
                <Tab.Screen
                    name='Saved'
                    component={SavedScreen}
                    options={{
                        tabBarLabel: "Saved",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="heart" size={24} color="#003580" />
                        ) : (
                            <Ionicons name="ios-heart-outline" size={24} color="black" />
                        )
                    }} />
                <Tab.Screen
                    name='Bookings'
                    component={BookingScreen}
                    options={{
                        tabBarLabel: "Bookings",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="notifications" size={24} color="#003580" />
                        ) : (
                            <Ionicons name="notifications-outline" size={24} color="black" />
                        )
                    }} />
                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="person" size={24} color="#003580" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="black" />
                        )
                    }} />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Main' component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name='Search' component={SearchScreen} options={{ headerShown: true }} />
                <Stack.Screen name='Places' component={PlacesScreen} />
                <Stack.Screen name='Map' component={MapScreen} options={{ headerShown: true }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator