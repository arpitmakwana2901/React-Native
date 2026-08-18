import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Color.js';

const PrimaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 25,

    marginTop: 20,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});