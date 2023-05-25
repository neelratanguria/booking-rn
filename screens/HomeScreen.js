import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-ranges';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GLOBALS from '../assets/globals';
import Header from '../components/header';
import {
    BottomModal,
    ModalFooter,
    ModalButton,
    ModalTitle,
    SlideAnimation,
    ModalContent
} from 'react-native-modals'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [selectedDates, setSelectedDates] = useState(null)
    const [rooms, setRooms] = useState(1)
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)

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
                                placeholder={`${rooms} room • ${adults} adults • ${children} Children`}
                                placeholderTextColor={"red"} />
                        </TouchableOpacity>

                        {/* Search Button */}
                        <TouchableOpacity style={{
                            ...styles.inputBox,
                            ...styles.inputSearch
                        }}>
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
            <BottomModal
                swipeThreshold={200}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={['up', 'down']}
                footer={
                    <ModalFooter>
                        <ModalButton
                            text="Apply"
                            style={styles.modalApplyButton}
                            onPress={() => setModalVisible(!modalVisible) }/>
                    </ModalFooter>
                }
                modalTitle={
                    <ModalTitle title="Select rooms and guests"/>
                }
                modalAnimation={new SlideAnimation({
                    slideFrom: "bottom"
                })}
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}>
                    <ModalContent style={styles.modalContent}>
                        <View style={styles.modalContentView}>
                            <Text>Rooms</Text>
                            <Pressable style={styles.modalControls}>
                                <TouchableOpacity
                                    style={styles.modalControl}
                                    onPress={() => {
                                        if(rooms > 1) {
                                            setRooms(rooms-1)
                                        }
                                    }}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <Pressable>
                                    <Text>{rooms}</Text>
                                </Pressable>
                                <TouchableOpacity
                                    style={styles.modalControl}
                                    onPress={() => {
                                        setRooms(rooms+1)
                                    }}>
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </Pressable>
                        </View>
                        <View style={styles.modalContentView}>
                            <Text>Adults</Text>
                            <Pressable style={styles.modalControls}>
                                <TouchableOpacity
                                    style={styles.modalControl}
                                    onPress={() => {
                                        if(adults > 1) {
                                            setAdults(adults-1)
                                        }
                                    }}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <Pressable>
                                    <Text>{adults}</Text>
                                </Pressable>
                                <TouchableOpacity
                                    style={styles.modalControl}
                                    onPress={() => {
                                        setAdults(adults+1)
                                    }}>
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </Pressable>
                        </View>
                        <View style={styles.modalContentView}>
                            <Text>Children</Text>
                            <Pressable style={styles.modalControls}>
                                <TouchableOpacity
                                    style={styles.modalControl}
                                    onPress={() => {
                                        if(children > 0) {
                                            setChildren(children-1)
                                        }
                                    }}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <Pressable>
                                    <Text>{children}</Text>
                                </Pressable>
                                <TouchableOpacity
                                style={styles.modalControl}
                                onPress={() => {
                                    setChildren(children+1)
                                }}>
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </Pressable>
                        </View>
                    </ModalContent>

            </BottomModal>
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
    modalApplyButton: {
        margin: 20,
        color: "white",
        backgroundColor: GLOBALS.COLOR.PRIMARY_BLUE
    },
    modalContent: {
        width: "100%",
        height: 310
    },
    modalContentView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        marginVertical: 15
    },
    modalControls: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    modalControl: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderColor: GLOBALS.COLOR.GRAY,
        backgroundColor: GLOBALS.COLOR.GRAY_100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})