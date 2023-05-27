import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import GLOBALS from '../assets/globals'
import React from 'react'

const OfferView = () => {
    return (
        <View>
            <Text
                style={styles.travelMoreText}>
                Travel more and spend less
            </Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Pressable style={styles.pressableCard}>
                    <Text style={styles.cardTitle}>Genius</Text>
                    <Text style={styles.cardDescription}>You are at Genius level 1 in our loyalty program</Text>
                </Pressable>
                <Pressable style={{
                    ...styles.pressableCard,
                    borderColor: GLOBALS.COLOR.GRAY_100,
                    backgroundColor: 'transparent',
                    borderWidth: 2
                }}>
                    <Text style={{
                        ...styles.cardTitle,
                        color: 'black'
                    }}>10% Discounts</Text>
                    <Text style={{
                        ...styles.cardDescription,
                        color: 'black'
                    }}>Enjoy discount at participating at properties worldwide.</Text>
                </Pressable>
                <Pressable style={{
                    ...styles.pressableCard,
                    borderColor: GLOBALS.COLOR.GRAY_100,
                    backgroundColor: 'transparent',
                    borderWidth: 2
                }}>
                    <Text style={{
                        ...styles.cardTitle,
                        color: 'black'
                    }}>15% Discounts</Text>
                    <Text style={{
                        ...styles.cardDescription,
                        color: 'black'
                    }}>Complete 5 stays to unlock level 2</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

export default OfferView

const styles = StyleSheet.create({
    travelMoreText: {
        marginHorizontal: 20,
        fontSize: 17,
        fontWeight: "500"
    },
    pressableCard: {
        width: 200,
        height: 150,
        marginTop: 10,
        backgroundColor: GLOBALS.COLOR.PRIMARY_BLUE,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 7
    },
    cardDescription: {
        color: 'white',
        fontSize: 15,
        fontWeight: "500"
    }
})