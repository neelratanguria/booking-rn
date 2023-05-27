import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


const PropertyControl = ({modalDispatchers}) => {
  return (
    <Pressable style={styles.controlsContainer}>
      <TouchableOpacity 
        style={styles.controlContainer}
        onPress={() => modalDispatchers.toggleModal()}>
        <MaterialIcons name="sort" size={22} color="gray" />
        <Text style={styles.controlText}>Sort</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlContainer}>
        <Ionicons name="filter-outline" size={22} color="gray" />
        <Text style={styles.controlText}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlContainer}>
        <Ionicons name="map-outline" size={22} color="gray" />
        <Text style={styles.controlText}>Map</Text>
      </TouchableOpacity>
    </Pressable>
  )
}

export default PropertyControl

const styles = StyleSheet.create({
    controlsContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    controlContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 12
    },
    controlText: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 8
    }
})