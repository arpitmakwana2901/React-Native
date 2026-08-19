import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Color';

const SocialButton = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}
    >
      <Image source={icon} style={styles.icon} />

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 52,

    borderWidth: 1,
    borderColor: '#E5E5E5',

    borderRadius: 14,

    paddingHorizontal: 20,

    backgroundColor: Colors.white,

    marginBottom: 15,
  },

  icon: {
    width: 24,
    height: 24,

    resizeMode: 'contain',

    marginRight: 15,
  },

  text: {
    flex: 1,

    textAlign: 'center',

    fontSize: 16,

    fontWeight: '600',

    color: Colors.text,

    marginRight: 35,
  },
});
