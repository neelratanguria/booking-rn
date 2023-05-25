import { StyleSheet, Pressable, View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {
    BottomModal,
    ModalFooter,
    ModalButton,
    ModalTitle,
    SlideAnimation,
    ModalContent
} from 'react-native-modals'

import GLOBALS from '../assets/globals'

const BookingModal = ({
    modalVisible,
    countRoom,
    countAdult,
    countChildren,
    controlDispatcher,
    setModalVisible
}) => {
  return (
    <>
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
                                        if(countRoom > 1) {
                                            controlDispatcher.decreaseRoom()
                                        }
                                    }}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <Pressable>
                                    <Text>{countRoom}</Text>
                                </Pressable>
                                <TouchableOpacity
                                    style={styles.modalControl}
                                    onPress={() => {
                                        controlDispatcher.increaseRoom()
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
                                        if(countAdult > 1) {
                                            controlDispatcher.decreaseAdult()
                                        }
                                    }}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <Pressable>
                                    <Text>{countAdult}</Text>
                                </Pressable>
                                <TouchableOpacity
                                    style={styles.modalControl}
                                    onPress={() => {
                                        controlDispatcher.increaseAdult()
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
                                        if(countChildren > 0) {
                                            controlDispatcher.decreaseChildren()
                                        }
                                    }}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <Pressable>
                                    <Text>{countChildren}</Text>
                                </Pressable>
                                <TouchableOpacity
                                style={styles.modalControl}
                                onPress={() => {
                                    controlDispatcher.increaseChildren()
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

export default BookingModal

const styles = StyleSheet.create({

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