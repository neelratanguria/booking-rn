import { useNavigation, useRoute } from '@react-navigation/native';
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
import Header from '../components/Header';
import BookingModal from '../components/BookingModal';
import OfferView from '../components/OfferView';

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

    const route = useRoute()


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
                        <TouchableOpacity
                            style={styles.inputBox}
                            onPress={() => navigation.navigate("Search")}>
                            <Ionicons name="search-outline" size={24} color="gray" />
                            <TextInput
                                placeholder={
                                    route?.params ? route.params.input : 
                                    "Enter Your Destination"
                                }
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
                            onPress={() => { 
                                navigation.navigate("Places")
                            }}>
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <OfferView />
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
})