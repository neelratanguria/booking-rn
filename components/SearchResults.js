import { FlatList, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'



const SearchResults = ({ data, input, setInput }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.place.toLowerCase().includes(input.toLowerCase())) {
            if (input === "") {
              return null
            }
            return (
              <Pressable
                style={styles.placeContainer}
                onPress={() => {
                  setInput(item.place)
                  setTimeout(() => {
                    navigation.navigate("Home", {
                      input: item.place
                    })
                  }, 400);
                }}>
                <View>
                  <Image
                    source={{ uri: item.placeImage }}
                    style={styles.placeImage} />
                </View>
                <View style={styles.placeTextContainer}>
                  <Text style={styles.placeName}>{item.place}</Text>
                  <Text style={styles.placeDescription}>{item.shortDescription}</Text>
                  <Text>
                    {item.properties.length} {(item.properties.length > 1) ? "Properties" : "Property"}
                  </Text>
                </View>
              </Pressable>
            )
          }
        }} />
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  placeImage: {
    width: 70,
    height: 70
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  placeTextContainer: {
    marginLeft: 10
  },
  placeName: {
    fontSize: 15,
    fontWeight: '500'
  },
  placeDescription: {
    marginVertical: 4
  }
})