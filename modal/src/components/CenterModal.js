import React from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const CenterModal = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <View style={styles.modal}>

          <Text style={styles.title}>
            Hello 👋
          </Text>

          <Text style={styles.message}>
            Welcome to React Native Modal Showcase App.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>
              OK
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
};

export default CenterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '85%',

    backgroundColor: '#fff',

    borderRadius: 20,

    padding: 25,

    alignItems: 'center',

    elevation: 10,
  },

  title: {
    fontSize: 26,

    fontWeight: '700',

    color: Colors.primary,
  },

  message: {
    marginTop: 15,

    textAlign: 'center',

    color: '#666',

    fontSize: 16,

    lineHeight: 24,
  },

  button: {
    marginTop: 30,

    backgroundColor: Colors.primary,

    width: '100%',

    height: 50,

    borderRadius: 12,

    justifyContent: 'center',

    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',

    fontSize: 17,

    fontWeight: '600',
  },
});