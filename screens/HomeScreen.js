import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import {
    Button,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
 } from 'react-native';
import DatePicker from 'react-native-date-ranges';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GLOBALS from '../assets/globals';
import Header from '../components/header';
import BookingModal from '../components/BookingModal';

const actionTypes = {
    increaseRoom: "increaseRoom",
    decreaseRoom: "decreaseRoom",
    increaseAdult: "increaseAdult",
    decreaseAdult: "decreaseAdult",
    increaseChildren: "increaseChildren",
    decreaseChildren: "decreaseChildren"
}

const controlsReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.increaseRoom: {
            console.log('increasing')
            return {
                ...state,
                countRoom: state.countRoom + 1
            }
        }
        case actionTypes.decreaseRoom: {
            console.log('decreasing')
            return {
                ...state,
                countRoom: state.countRoom - 1
            }
        }
        case actionTypes.increaseAdult: {
            return {
                ...state,
                countAdult: state.countAdult + 1
            }
        }
        case actionTypes.decreaseAdult: {
            return {
                ...state,
                countAdult: state.countAdult - 1
            }
        }
        case actionTypes.increaseChildren: {
            return {
                ...state,
                countChildren: state.countChildren + 1
            }
        }
        case actionTypes.decreaseChildren: {
            return {
                ...state,
                countChildren: state.countChildren - 1
            }
        }
        default: {
            throw new Error()
        }
    }
}

const useControls = (reducer) => {
    const [state, dispatch] = React.useReducer(reducer, {
        countRoom: 1,
        countAdult: 2,
        countChildren: 0
    })

    const increaseRoom = () => dispatch({ type: actionTypes.increaseRoom })
    const decreaseRoom = () => dispatch({ type: actionTypes.decreaseRoom })

    const increaseAdult = () => dispatch({ type: actionTypes.increaseAdult })
    const decreaseAdult = () => dispatch({ type: actionTypes.decreaseAdult })

    const increaseChildren = () => dispatch({ type: actionTypes.increaseChildren })
    const decreaseChildren = () => dispatch({ type: actionTypes.decreaseChildren })

    const dispatchers = {
        increaseRoom: increaseRoom,
        decreaseRoom: decreaseRoom,
        increaseAdult: increaseAdult,
        decreaseAdult: decreaseAdult,
        increaseChildren: increaseChildren,
        decreaseChildren: decreaseChildren
    }

    return {
        state,
        dispatchers
    }
}

const HomeScreen = () => {
    const navigation = useNavigation()
    const [selectedDates, setSelectedDates] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const { state, dispatchers } = useControls(controlsReducer)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShow: true,
            title: "Booking.com",
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
            },
            headerRight: () => (
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="white"
                    style={{ marginRight: 12 }} />
            )
        })
    }, [])

    const customButton = (onConfirm) => {
        return (
            <Button
                onPress={onConfirm}
                style={styles.dataPickerSubmitButton}
                primary
                title='Sumbit'
            />
        )
    }

    return (
        <>
            <View>
                <Header />
                <ScrollView>
                    <View style={styles.searchContainer}>
                        {/* Destination */}
                        <TouchableOpacity style={styles.inputBox}>
                            <Ionicons name="search-outline" size={24} color="gray" />
                            <TextInput
                                placeholder='Enter your Destination'
                                placeholderTextColor={"black"} />
                        </TouchableOpacity>

                        {/* Selected Dates */}
                        <TouchableOpacity style={styles.inputBox}>
                            <MaterialIcons name="date-range" size={24} color="gray" />
                            <DatePicker
                                style={styles.datePicker}
                                customStyles={{
                                    placeholderText: styles.placeholder,
                                    headerStyle: styles.datePickerHeader,
                                    contentText: styles.placeholder
                                }}
                                selectedBgColor={GLOBALS.COLOR.SECONDARY_BLUE}
                                customButton={(onConfirm) => customButton(onConfirm)}
                                onConfirm={(dates) => setSelectedDates(dates)}
                                allowFontScaling={false} // optional
                                placeholder={'Start Date → End Date'}
                                mode={'range'}
                            />
                        </TouchableOpacity>

                        {/* Rooms and guests */}
                        <TouchableOpacity style={styles.inputBox}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name="person-outline" size={24} color="gray" />
                            <TextInput
                                editable={false}
                                selectTextOnFocus={false}
                                focusable={false}
                                placeholder={`${state.countRoom} room • ${state.countAdult} adults • ${state.countChildren} Children`}
                                placeholderTextColor={"red"} />
                        </TouchableOpacity>

                        {/* Search Button */}
                        <TouchableOpacity
                            style={{
                                ...styles.inputBox,
                                ...styles.inputSearch
                            }}
                            onPress={() => { }}>
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
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
                    <Pressable
                        style={{
                            marginTop: 40,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{ width: 200, height: 50, resizeMode: "cover" }}
                            source={{
                                uri: "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
                            }}
                        />
                    </Pressable>
                </ScrollView>
            </View>
            <BookingModal
                modalVisible={modalVisible}
                controlDispatcher={dispatchers}
                setModalVisible={setModalVisible}
                {...state} />
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    searchContainer: {
        margin: 20,
        borderColor: GLOBALS.COLOR.YELLOW,
        borderWidth: 3,
        borderRadius: 6
    },
    inputBox: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        gap: 10,
        borderColor: GLOBALS.COLOR.YELLOW,
        borderWidth: 2,
        alignItems: 'center'
    },
    placeholder: {
        fontSize: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 'auto'
    },
    datePickerHeader: {
        backgroundColor: GLOBALS.COLOR.PRIMARY_BLUE
    },
    datePicker: {
        width: 280,
        height: 30,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'transparent'
    },
    dataPickerSubmitButton: {
        container: {
            width: "80%",
            marginHorizontal: "3%"
        },
        text: {
            fontSize: 20
        }
    },
    inputSearch: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2A52BE'
    },
    searchButtonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "500",
        color: "white"
    },
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