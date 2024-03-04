import {View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import React from 'react';

const CustomBottomModal = ({children, isModalVisible, setModalVisible}) => {
  return (
    <Modal transparent={true} visible={isModalVisible} animationType="slide">
      <TouchableOpacity
        style={styles.modalBackdrop}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>{children}</View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomBottomModal;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
  },
});
