import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import globals from '../assets/globals'
import { propertiesData } from '../assets/data/propertiesData'
import SearchResults from '../components/SearchResults'

const SearchScreen = () => {
    const [input, setInput] = useState("Ban")
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
            placeholder='Enter Your Destination'
            style={styles.searchInput}
            value={input}
            onChangeText={(text) => setInput(text)}/>
        <Ionicons
            name="search-outline"
            size={24}
            color="black"
            />
      </View>
      <SearchResults
        data={propertiesData}
        input={input}
        setInput={setInput}/>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: globals.COLOR.YELLOW,
        borderWidth: 4,
        flexDirection: 'row',
        borderRadius: 10
    },
    searchInput: {
        height: 30,
        flexGrow: 1
    }
})