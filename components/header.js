import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Header = () => {
    return (
        <ScrollView style={{
            backgroundColor: "#003580",
            height: 65,
            flexDirection: "row",
            gap: 30,  
            }}
            contentContainerStyle={styles.wrapper}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{
                borderWidth: 1,
                borderRadius: 20,
                ...styles.option
            }}>
                <Ionicons name="bed-outline" size={24} color="white" />
                <Text style={{
                    color: "white",
                    marginLeft: 8,
                    fontWeight: "bold",
                    fontSize: 15
                }}>Stay</Text>
            </TouchableOpacity>
            <Pressable style={{
                ...styles.option
            }}>
                <SimpleLineIcons name="plane" size={24} color="white" />
                <Text style={{
                    color: "white",
                    marginLeft: 8,
                    fontWeight: "bold",
                    fontSize: 15
                }}>
                    Flights
                </Text>
            </Pressable>
            <Pressable style={{
                ...styles.option
            }}>
                <AntDesign name="car" size={24} color="white" />
                <Text style={{
                    color: "white",
                    marginLeft: 8,
                    fontWeight: "bold",
                    fontSize: 15
                }}>Car Rental</Text>
            </Pressable>
            <Pressable style={{
                ...styles.option
            }}>
                <MaterialIcons name="local-taxi" size={24} color="white" />
                <Text style={{
                    color: "white",
                    marginLeft: 8,
                    fontWeight: "bold",
                    fontSize: 15
                }}>Taxi</Text>
            </Pressable>
        </ScrollView>
    )
}

export default Header

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        justifyContent: "space-around"
    },
    option: {
        alignItems: 'center',
        flexDirection: "row",
        borderColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 8,
    }
})