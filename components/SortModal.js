import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {
  BottomModal,
  ModalFooter,
  ModalButton,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from 'react-native-modals';
import globals from '../assets/globals';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SortFilterModal = ({
  modalState,
  modalDispatchers,
  applyFilter,
}) => {
  const filters = [
    {
      id: '0',
      filter: 'cost:Low to High',
    },
    {
      id: '1',
      filter: 'cost:High to Low',
    },
  ];

  return (
    <>
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => modalDispatchers.toggleModal()}
        swipeDirection={['up', 'down']}
        footer={
          <ModalFooter>
            <Pressable
              style={styles.footer}
              onPress={() => applyFilter(modalState.selectedFilter)}>
              <Text>Apply</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => modalDispatchers.toggleModal()}
        onTouchOutside={() => modalDispatchers.toggleModal()}
        visible={modalState.modalVisible}>
        <ModalContent styles={styles.content}>
          <View style={styles.container}>
            <View style={styles.controlType}>
              <Text style={styles.controlText}>Sort</Text>
            </View>

            <View style={styles.options}>
              {filters.map((item, index) => (
                <Pressable
                  key={index}
                  style={styles.option}
                  onPress={() => modalDispatchers.setFilter(item.filter)}>
                  {item.filter.includes(modalState.selectedFilter) ? (
                    <MaterialIcons
                      name="check-circle"
                      size={18}
                      color="green"
                    />
                  ) : (
                    <MaterialIcons
                      name="circle"
                      size={18}
                      color={globals.COLOR.GRAY_100}
                    />
                  )}

                  <Text style={styles.optionText}>{item.filter}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default SortFilterModal;

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    paddingVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 5,
    alignItems: 'center'
  },
  content: {
    width: '100%',
    height: 2800,
  },
  container: {
    flexDirection: 'row',
  },
  controlType: {
    marginVertical: 10,
    flex: 2,
    height: 280,
    borderRightWidth: 1,
    borderColor: globals.COLOR.GRAY_100,
  },
  controlText: {
    textAlign: 'center',
  },
  options: {
    flex: 3,
    margin: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
