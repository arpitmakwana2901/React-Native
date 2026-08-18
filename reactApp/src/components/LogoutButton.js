import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Color.js';

const LogoutButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        Log Out
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
button: {
  marginHorizontal: 16,

  marginTop: 45,

  backgroundColor: '#FF2D2D',

  paddingVertical: 15,

  borderRadius: 30,

  alignItems: 'center',

  shadowColor: '#000',

  shadowOpacity: 0.15,

  shadowRadius: 8,

  shadowOffset: {
    width: 0,
    height: 4,
  },

  elevation: 6,
},

text: {
  color: '#fff',

  fontSize: 18,

  fontWeight: '600',
},
});