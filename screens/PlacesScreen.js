import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import PropertyControl from '../components/PropertyControl'
import globals from '../assets/globals'
import { propertiesData } from '../assets/data/propertiesData'
import PropertyCard from '../components/PropertyCard'

const PlacesScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()

    console.log(route.params.counts)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShow: true,
            title: "Popular Places",
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "white"
            },
            headerStyle: {
                backgroundColor: "#003580",
                height: 110,
                borderBottomColor: 'transparent',
                shadowColor: 'transparent'
            }
        })
    }, [])


    return (
        <View>
            <PropertyControl />
            <ScrollView>
                {
                    console.log()
                }
                { (propertiesData?.filter((item) => item.place === route.params.place))[0]?.properties.map(
                    (property, index) =>
                    <PropertyCard
                        key={index}
                        property={property}
                        rooms={route.params?.counts?.countRoom}
                        children={route.params?.counts?.countChildren}
                        adults={route.params?.counts?.countAdult}
                        selectedDates={route.params?.selectedDates}
                        availableRooms={property.rooms}
                        />
                )}
            </ScrollView>
        </View>
    )
}

export default PlacesScreen

const styles = StyleSheet.create({
    propertyScroll: {
        backgroundColor: globals.COLOR.WHITE_100
    }
})